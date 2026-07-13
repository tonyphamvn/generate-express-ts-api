## 0.0.2 (2026-07-13)

Generate Express TS Starter 0.0.2 adds multi-ORM scaffolding, auth APIs (`register` / `me`), Prisma 7 support, and a GitHub Release workflow for publishing.

# Migrating from 0.0.1 to 0.0.2

```bash
npx generate-express-ts-starter@0.0.2 my-api
```

Or upgrade an existing global/local install:

```bash
npm install -g generate-express-ts-starter@0.0.2
```

#### 🚀 New Feature

* `generate-express-ts-starter`
  * Add `--orm` option: `mikroorm` (default) | `sequelize` | `prisma` | `typeorm`
  * Keep `--database` orthogonal: `postgres` | `mysql` | `sqlite`
  * Ship ORM overlays under `templates/orm/*`
* Template API
  * Add `POST /api/v1/auth/register`
  * Add `GET /api/v1/users/me` (JWT required)
  * Add `requireAuth` middleware
* Release
  * Add `.github/workflows/release.yml` (npm publish + GitHub Release on `v*` tags)

#### 🐛 Bug Fix

* `generate-express-ts-starter`
  * Pin `figlet@1.7.0` to fix MikroORM CLI crash on Node 24
  * Fix local template copy recursion when scaffolding inside the repo
* Template
  * Fix Passport `Express.User` typing for `req.user.id`
  * Map MikroORM `createdAt` / `updatedAt` to camelCase DB columns
  * Align Prisma overlay with Prisma 7 (`prisma.config.ts` + driver adapters)

#### 💅 Enhancement

* Make **MikroORM** the default ORM (repo root + CLI `--yes`)
* Upgrade `bcrypt` to v6; add `ajv` override for audit cleanup
* Use `postgres:14-alpine` for arm64-friendly Docker images
* Exit UX: print next steps after event loop drains (`beforeExit`)

#### 📝 Documentation

* Rewrite root README in Create React App style
* Add npm package README with usage, options, and releasing steps

#### 🏠 Internal

* Rename package to `generate-express-ts-starter`
* Replace legacy publish workflow with unified `release.yml`
* Enable `publishConfig.provenance`

#### Committers: 1

* tonypham (@tonyphamvn)

## 0.0.1 (2026-07-10)

Initial release of **generate-express-ts-starter**: an Express + TypeScript API template with Sequelize, plus a CLI to scaffold new projects.

```bash
npx generate-express-ts-starter@0.0.1 my-api
```

#### 🚀 New Feature

* `generate-express-ts-starter`
  * Scaffold Express + TypeScript projects from the template
  * Interactive prompts via `@clack/prompts`, or `--yes` for defaults
  * Options: `--database` (`postgres` | `mysql` | `sqlite`), `--jwt` / `--no-jwt`, `--docker` / `--no-docker`, `--redis` / `--no-redis`, `--git` / `--no-git`, `--package-manager`, `--provider` (`degit` | `giget`), `--template`, `--local`
* Template API
  * Express + TypeScript + Sequelize (Postgres by default)
  * JWT auth module (Passport JWT) with login flow
  * Users module, Winston logging, validation, error handling
  * Docker / docker-compose support
  * Optional Redis + Socket.IO wiring

#### 🏠 Internal

* Add `packages/create-express-app` CLI package
* Add `.github/workflows/publish-create-express-ts-app.yml` (npm publish on `v*` tags)
* Fix tag version extraction so publish verifies `package.json` matches the git tag

#### Committers: 1

* tonypham (@tonyphamvn)
