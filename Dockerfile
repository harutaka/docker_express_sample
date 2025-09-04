# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# RUN npm install -g pnpm  # For Node 25 or above
COPY . /app
WORKDIR /app

# ------------------------------------------
# Package install Stage
FROM base AS module
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# ------------------------------------------
# Build Stage
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# ------------------------------------------
# Run Stage
FROM base AS final

ARG PORT=3000
ENV PORT=${PORT}

COPY --from=module /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE ${PORT}

CMD [ "pnpm", "start" ]
