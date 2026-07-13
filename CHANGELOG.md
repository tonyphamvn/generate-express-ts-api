## 0.0.1 (2026-07-10)

First ship **generate-express-ts-api**: Express + TypeScript + Sequelize template + CLI scaffold.

```bash
npx generate-express-ts-api@0.0.1 my-api
```

#### 🚀 New Feature

- `generate-express-ts-api`
  - Scaffold Express + TypeScript from template
  - Interactive prompts via `@clack/prompts`, or `--yes` for defaults
  - Options: `--database` (`postgres` | `mysql` | `sqlite`), `--jwt` / `--no-jwt`, `--docker` / `--no-docker`, `--redis` / `--no-redis`, `--git` / `--no-git`, `--package-manager`, `--provider` (`degit` | `giget`), `--template`, `--local`
- Template API
  - Express + TypeScript + Sequelize (Postgres default)
  - JWT auth (Passport JWT) + login flow
  - Users module, Winston logging, validation, error handling
  - Docker / docker-compose
  - Optional Redis + Socket.IO

#### 🏠 Internal

- Add `packages/create-express-app` CLI package
- Add `.github/workflows/publish-create-express-ts-app.yml` (npm publish on `v*` tags)
- Fix tag version extract → publish verify `package.json` match git tag

#### Committers: 1

- tonypham (@tonyphamvn)
