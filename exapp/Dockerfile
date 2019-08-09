FROM node:lts-alpine

ARG UID=991
ARG GID=991

ENV NODE_ENV=production

WORKDIR /scripts

COPY package.json package-lock.json /scripts/

RUN npm install --production --no-progress

COPY . .

RUN addgroup app -g ${GID} \
  && adduser -D -G app -u ${UID} app \
  && chown -R app:app /scripts

USER app

EXPOSE 3000

CMD ["npm", "start"]