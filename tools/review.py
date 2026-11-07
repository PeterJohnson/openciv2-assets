#!/usr/bin/env python3
"""Rebuild original/native/HD artwork comparisons using an explicit game-source baseline."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tarfile
import tempfile

ROOT = Path(__file__).resolve().parents[1]
TOOLS = ROOT / 'tools/atlas-review'
BUILD = ROOT / 'build/atlas-review'
PACK = ROOT / 'assets/atlas-hd'
from dependency import digest, inventory, read_json, safe_name, write_json


def run(args, env=None):
    print('+ ' + subprocess.list2cmdline([str(x) for x in args]), flush=True)
    subprocess.run([str(x) for x in args], cwd=ROOT, env=env, check=True)


def prepare_source(checkout, revision):
    checkout = checkout.expanduser().resolve()
    if not (checkout / 'src/auto/mapview.cpp').is_file():
        raise ValueError(f'Not an OpenCiv2 source checkout: {checkout}')
    if revision == 'working-tree':
        return checkout, revision
    try:
        commit = subprocess.check_output(['git', '-C', str(checkout), 'rev-parse', '--verify',
                                          revision + '^{commit}'], text=True, stderr=subprocess.PIPE).strip()
    except subprocess.CalledProcessError as error:
        raise ValueError(f'Review revision {revision} is not available in {checkout}. '
                         'Use a checkout with upstream history, fetch that revision, or select --source-ref.') from error
    target = BUILD / 'source' / commit
    if target.exists():
        manifest = read_json(target / 'source.json')
        if manifest['revision'] != commit or inventory(target, manifest['files']) != manifest['files']:
            raise ValueError(f'Review source snapshot changed; remove it and retry: {target}')
        return target, commit
    target.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='snapshot-', dir=target.parent) as temp:
        temp = Path(temp)
        assert temp.resolve().is_relative_to((BUILD / 'source').resolve())
        proc = subprocess.Popen(['git', '-C', str(checkout), 'archive', '--format=tar', commit, '--', 'src', 'tools'], stdout=subprocess.PIPE)
        files = []
        try:
            with tarfile.open(fileobj=proc.stdout, mode='r|') as archive:
                for member in archive:
                    if member.isdir(): continue
                    safe_name(member.name)
                    if not member.isfile():
                        raise ValueError(f'Unsupported review source entry: {member.name}')
                    dest = temp / member.name
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    with archive.extractfile(member) as source, dest.open('wb') as out:
                        shutil.copyfileobj(source, out)
                    files.append(member.name)
            if proc.wait(): raise ValueError('Could not export review source')
        finally:
            proc.stdout.close()
            if proc.poll() is None: proc.kill(); proc.wait()
        write_json(temp / 'source.json', {'revision': commit, 'files': inventory(temp, files)})
        # Publish only the verified source snapshot. No checkout branch is changed.
        temp.rename(target)
    return target, commit


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source', type=Path, help='OpenCiv2 source checkout (or OPENCIV2_SOURCE_DIR; default: sibling openciv2)')
    ap.add_argument('--source-ref', help='Git revision to replay; default is the saved revision or retained reference; working-tree uses local files')
    ap.add_argument('--game', type=Path, help='original game installation (or CIV2_GAME)')
    ap.add_argument('--save', type=Path, help='retained he_a1788.sav (or CIV2_REVIEW_SAVE; default: GAME/midgame1/he_a1788.sav)')
    ap.add_argument('--node', default=os.environ.get('NODE', 'node'))
    ap.add_argument('--steps', nargs='+', choices=['configure', 'build', 'comparisons', 'original', 'extended', 'verify', 'gallery'],
                    default=['build', 'comparisons', 'original', 'extended', 'verify', 'gallery'])
    args = ap.parse_args()
    if os.name != 'nt' and any(s in args.steps for s in ('build', 'original', 'comparisons', 'extended', 'verify')):
        ap.error('The retained standalone renderers currently require Windows with MSVC x86 build tools.')
    old = read_json(BUILD / 'config.json') if (BUILD / 'config.json').exists() else {}
    source = args.source or Path(os.environ.get('OPENCIV2_SOURCE_DIR') or old.get('sourceCheckout') or ROOT.parent / 'openciv2')
    revision = args.source_ref or old.get('sourceRevision') or read_json(TOOLS / 'review-source.json')['revision']
    game = args.game or (Path(os.environ['CIV2_GAME']) if os.environ.get('CIV2_GAME') else None)
    game = game or (Path(old['game']) if old.get('game') else None)
    if game: game = game.expanduser().resolve()
    save = args.save or (Path(os.environ['CIV2_REVIEW_SAVE']) if os.environ.get('CIV2_REVIEW_SAVE') else None)
    save = save or (Path(old['save']) if old.get('save') and not args.game and not os.environ.get('CIV2_GAME') else None)
    save = save or (game / 'midgame1/he_a1788.sav' if game else None)
    if save: save = save.expanduser().resolve()
    if any(s in args.steps for s in ('original', 'extended')):
        if not game or not game.is_dir(): ap.error('Supply --game PATH or CIV2_GAME for original-art comparisons')
        for name in ['TERRAIN1.GIF', 'TERRAIN2.GIF', 'UNITS.GIF', 'CITIES.GIF', 'ICONS.GIF', 'PEOPLE.GIF', 'CITY.GIF',
                     'cv.dll', 'pv.dll', 'mk.dll', 'ss.dll']:
            if not (game / name).is_file(): ap.error(f'Original game file missing: {game / name}')
    if 'extended' in args.steps:
        expected = read_json(PACK / 'review/fixtures/saved-world.json')['provenance']['saveSha256']
        if not save or not save.is_file() or digest(save) != expected:
            ap.error('Extended comparisons need the retained he_a1788.sav; supply --save with the file recorded in saved-world.json')
        for name in ['civ2.exe', 'tiles.dll', 'RULES.TXT', 'LABELS.TXT', 'GAME.TXT', 'PEDIA.TXT', 'DESCRIBE.TXT', 'CREDITS.TXT', 'SCREDITS.GIF']:
            if not (game / name).is_file(): ap.error(f'Extended comparison input missing: {game / name}')
    source_root, commit = prepare_source(source, revision)
    config = dict(sourceCheckout=str(source.resolve()), sourceRoot=str(source_root), sourceRevision=commit,
                  game=str(game) if game else None, save=str(save) if save else None)
    write_json(BUILD / 'config.json', config)
    print(f'Review source: {source.resolve()} @ {commit}', flush=True)
    env = dict(os.environ, ATLAS_REVIEW_SOURCE=str(source_root), ATLAS_REVIEW_PYTHON=sys.executable,
               ATLAS_REVIEW_REUSE_ART='1')
    if game: env['CIV2_GAME'] = str(game)
    # A comparison rebuild must not edit approved runtime artwork or installed inputs.
    runtime_names = read_json(ROOT / 'runtime-inputs.json')
    runtime_before = inventory(PACK, runtime_names)
    original_names = [p.name for p in game.iterdir() if p.is_file() and p.suffix.lower() in ('.gif', '.dll', '.exe', '.txt')] if game else []
    originals_before = inventory(game, original_names) if game else {}
    save_hash = digest(save) if save and save.is_file() else None
    shell = shutil.which('pwsh') or shutil.which('powershell')
    def py(name, *more): run([sys.executable, TOOLS / name, *more], env)
    def node(name, *more): run([args.node, TOOLS / name, *more], env)
    def build(name):
        if not shell: raise ValueError('PowerShell is required to discover and invoke the MSVC x86 compiler')
        for configuration in ('Debug', 'Release'):
            run([shell, '-NoProfile', '-File', TOOLS / name, '-Configuration', configuration,
                 '-Source', source_root, '-Python', sys.executable], env)
    for step in args.steps:
        if step == 'configure': continue
        if step == 'build':
            build('build-engine.ps1'); build('build-reports.ps1')
        elif step == 'comparisons':
            node('build-review.cjs', '--reuse-bindings')
            node('build-support.cjs')
            node('windows.cjs')
            node('saved-map.cjs')
        elif step == 'original':
            py('original-assets.py', '--game', game)
            node('original.cjs')
        elif step == 'extended':
            py('prepare-report-inputs.py', '--game', game, '--save', save)
            py('prepare-other-inputs.py', '--game', game)
            py('prepare-native-other.py', '--game', game, '--save', save)
            build('build-other.ps1')
            node('build-other-windows.cjs')
        elif step == 'verify':
            node('verify.cjs')
            node('verify-other-windows.cjs')
        elif step == 'gallery': node('build-gallery.cjs')
    if inventory(PACK, runtime_names) != runtime_before:
        raise ValueError('Review rebuild changed selected runtime artwork')
    if game and inventory(game, original_names) != originals_before:
        raise ValueError('Installed original-game inputs changed during review')
    if save_hash and digest(save) != save_hash:
        raise ValueError('Original comparison save changed during review')
    write_json(BUILD / 'last-run.json', dict(config, steps=args.steps, runtimeInputsUnchanged=True,
                                            originalInputsUnchanged=True, saveUnchanged=True))
    print('Review steps passed; runtime artwork and installed original-game inputs are unchanged.', flush=True)
    print(f'Gallery: {PACK / "index.html"}', flush=True)


if __name__ == '__main__':
    try: main()
    except (ValueError, OSError, tarfile.TarError, subprocess.CalledProcessError) as error:
        print(f'Review build failed: {error}', file=sys.stderr)
        sys.exit(1)
