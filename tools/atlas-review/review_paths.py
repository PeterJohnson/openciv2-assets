"""Separate the graphics checkout, configured game source, and generated output."""
import json
import os
from pathlib import Path

ASSETS_ROOT = Path(__file__).resolve().parents[2]
BUILD_ROOT = ASSETS_ROOT / 'build/atlas-review'


def settings():
    path = BUILD_ROOT / 'config.json'
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}


def source_root():
    configured = os.environ.get('ATLAS_REVIEW_SOURCE') or settings().get('sourceRoot')
    if not configured:
        raise ValueError('Configure the review source with python tools/review.py --source PATH --steps configure')
    root = Path(configured).expanduser().resolve()
    if not (root / 'src/auto/mapview.cpp').is_file():
        raise ValueError(f'Invalid configured game source: {root}')
    return root


def source_file(name):
    return (ASSETS_ROOT if str(name).startswith('data/native/') else source_root()) / name


def source_identity():
    manifest = source_root() / 'source.json'
    revision = json.loads(manifest.read_text(encoding='utf-8'))['revision'] if manifest.is_file() else 'working-tree'
    return {'repository': 'openciv2', 'revision': revision}
