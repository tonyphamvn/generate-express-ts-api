import fs from 'node:fs/promises';
import path from 'node:path';

const PNPM_ALLOW_BUILDS = {
  bcrypt: true,
  'unrs-resolver': true,
};

export async function writePnpmWorkspaceConfig(targetDir) {
  const workspacePath = path.join(targetDir, 'pnpm-workspace.yaml');
  const lines = [
    '# pnpm 11+ settings live here, not in package.json',
    'overrides:',
    '  "@types/express": "^5.0.6"',
    '  "@types/express-serve-static-core": "^5.1.2"',
    '',
    'allowBuilds:',
    ...Object.entries(PNPM_ALLOW_BUILDS).map(
      ([name, allowed]) => `  ${JSON.stringify(name)}: ${allowed}`,
    ),
    '',
  ];

  await fs.writeFile(workspacePath, lines.join('\n'));
}
