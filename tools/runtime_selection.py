"""Explicit runtime inputs within the larger artwork and authoring repository."""
from pathlib import Path, PurePosixPath
from dependency import read_json, safe_name


class RuntimeArt:
    def __init__(self, repo):
        self.root = Path(repo) / 'assets/atlas-hd'
        names = read_json(Path(repo) / 'runtime-inputs.json')
        if (not isinstance(names, list) or not names
                or any(not isinstance(n, str) for n in names)
                or len(names) != len(set(names))):
            raise ValueError('runtime-inputs.json must contain unique runtime paths')
        for name in names:
            safe_name(name)
            if PurePosixPath(name).parts[0].casefold() in ('review', 'authoring'):
                raise ValueError(f'Authoring/review material is not a runtime input: {name}')
        self.names = frozenset(names)
        self.used = set()

    def path(self, name):
        name = str(name).replace('\\', '/')
        if name not in self.names:
            raise ValueError(f'Artwork is not selected in runtime-inputs.json: {name}')
        self.used.add(name)
        return self.root / name

    def pngs(self, directory):
        """Enumerate selected PNGs, never other images found beside them."""
        directory = PurePosixPath(directory)
        return [self.root / name for name in sorted(self.names)
                if PurePosixPath(name).parent == directory and name.endswith('.png')]
