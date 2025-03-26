# syntax=docker/dockerfile:1

# Build Stage
FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS build

WORKDIR /build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci

# mountでは読み取り専用になるのでコピー
COPY . .
RUN npm run build

# ------------------------------------------
# Package install Stage

FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS module

WORKDIR /modules

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm,sharing=locked \
    npm ci --omit=dev

# ------------------------------------------
# Run Stage
FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS final

ARG PORT=3000
ENV PORT=${PORT}

WORKDIR /app

COPY package*.json ./

COPY --from=build /build/dist/src ./dist/src
COPY --from=module /modules/node_modules ./node_modules

EXPOSE ${PORT}

ENTRYPOINT ["node", "dist/src/app"]