FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY apps/backend/ ./apps/backend/
COPY packages/database/ ./packages/database/
COPY packages/schemas/ ./packages/schemas/
COPY packages/eslint-config/ ./packages/eslint-config/
COPY packages/typescript-config/ ./packages/typescript-config/

RUN pnpm i

CMD ["pnpm", "-F", "backend", "dev"]
