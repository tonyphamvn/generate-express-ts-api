## 0.0.2 (2026-07-13)

Generate Express TS API 0.0.2 upgrades the template to Express 5, adds a `--deploy` runtime choice (Docker / PM2 / none), and refactors Socket.IO behind a dedicated Redis-backed module.

# Migrating from 0.0.1 to 0.0.2

```bash
npx generate-express-ts-api@0.0.2 my-api
```

Or upgrade an existing global/local install:

```bash
npm install -g generate-express-ts-api@0.0.2
```

- CLI: prefer `--deploy <mode>`; `--docker` / `--no-docker` still work as aliases (`docker` / `none`)
- Template apps: bump `express` + `@types/express` to **5.x**; remove `body-parser` (use `express.json()` / `express.urlencoded()`)
- Socket.IO: move inline setup → `src/libs/socket.ts`; call `initSocket(httpServer)` / `getIO()`; drop `@socket.io/redis-emitter` if unused
- Scripts: default `start` is `node dist/index.js` (PM2 only when `--deploy pm2`); replace `clean` with `prebuild` (`rm -rf dist`)
- Types: add `@types/express-serve-static-core` 5.x (and npm `overrides` if needed) to avoid Express 4/5 type clashes

#### 🚀 New Feature

- `generate-express-ts-api`
  - Add `--deploy` option: `docker` (default) | `pm2` | `none`
  - Keep `--docker` / `--no-docker` / `--pm2` as aliases
  - Prompt: “Production runtime” (Docker / PM2 / Neither)
  - PM2: write `ecosystem.config.cjs`, `start` via `pm2-runtime`; keep compose for DB/Redis, drop Dockerfile
- Template API
  - Upgrade Express **4 → 5.2** (`@types/express` 5.x); drop `body-parser`
  - Move Socket.IO to `src/libs/socket.ts` with Redis adapter + `initSocket` / `getIO`
  - Tune Dockerfile / `.dockerignore` for deploy modes

#### 💅 Enhancement

- Clearer post-scaffold messaging (`Done. Created …` + next steps)
- Use `prebuild` to clean `dist` instead of a separate `clean` script

#### 📝 Documentation

- Update package README for `--deploy` / PM2 and Express 5

#### 🏠 Internal

- Add `packages/generate-express-ts-api/lib/features/deploy.js`
- Bump package version to `0.0.2`

#### Committers: 1

- tonypham (@tonyphamvn)

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
