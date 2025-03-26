# Build Stage
FROM node:18-bullseye-slim AS build

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && rm -rf ./dist/test

# ------------------------------------------
# Package install Stage

FROM node:18-bullseye-slim AS module
ENV NODE_ENV=production

WORKDIR /modules

COPY package*.json ./

RUN npm ci

# ------------------------------------------
# Run Stage
FROM node:18-bullseye-slim AS final

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app

COPY package*.json ./

COPY --from=build /build/dist ./dist
COPY --from=module /modules/node_modules ./node_modules

EXPOSE ${PORT}
CMD ["dist/src/app"]