"""Source selection must be explicit, reproducible, and leave the game checkout alone."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'tools'))
import review


class ReviewSourceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.checkout = self.root / 'source checkout'
        (self.checkout / 'src/auto').mkdir(parents=True)
        self.file = self.checkout / 'src/auto/mapview.cpp'
        self.file.write_bytes(b'// reference renderer\n')
        (self.checkout / 'tools').mkdir()
        (self.checkout / 'tools/native.h').write_bytes(b'// reference helpers\n')
        self.git('init', '-q')
        self.git('config', 'user.name', 'Review test')
        self.git('config', 'user.email', 'review-test@example.invalid')
        self.git('config', 'core.autocrlf', 'false')
        self.git('add', '--all')
        self.git('commit', '-qm', 'reference')
        self.commit = self.git('rev-parse', 'HEAD')
        self.patch = patch.object(review, 'BUILD', self.root / 'generated review')
        self.patch.start()
        self.addCleanup(self.patch.stop)

    def git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.checkout, text=True).strip()

    def test_pinned_snapshot_does_not_change_checkout_or_use_local_edits(self):
        self.file.write_bytes(b'// uncommitted working renderer\n')
        before = self.git('status', '--porcelain')
        source, commit = review.prepare_source(self.checkout, self.commit)
        self.assertEqual(commit, self.commit)
        self.assertEqual((source / 'src/auto/mapview.cpp').read_bytes(), b'// reference renderer\n')
        self.assertEqual(self.git('rev-parse', 'HEAD'), self.commit)
        self.assertEqual(self.git('status', '--porcelain'), before)
        self.assertEqual(review.prepare_source(self.checkout, self.commit), (source, commit))
        (source / 'src/auto/mapview.cpp').write_bytes(b'changed cache')
        with self.assertRaisesRegex(ValueError, 'snapshot changed'):
            review.prepare_source(self.checkout, self.commit)

    def test_invalid_source_or_revision_never_silently_falls_back(self):
        with self.assertRaisesRegex(ValueError, 'Not an OpenCiv2'):
            review.prepare_source(self.root / 'missing', self.commit)
        with self.assertRaisesRegex(ValueError, 'not available'):
            review.prepare_source(self.checkout, 'missing-review-revision')

    def test_working_tree_is_explicit(self):
        self.file.write_bytes(b'// edited renderer\n')
        source, revision = review.prepare_source(self.checkout, 'working-tree')
        self.assertEqual(source, self.checkout.resolve())
        self.assertEqual(revision, 'working-tree')
        self.assertEqual((source / 'src/auto/mapview.cpp').read_bytes(), b'// edited renderer\n')


if __name__ == '__main__':
    unittest.main()
