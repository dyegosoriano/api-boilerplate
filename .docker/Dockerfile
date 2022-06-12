# Build version
FROM node:16-slim as BUILDER
LABEL maintainer="Dyego Soriano" \
      version="1.0"

RUN mkdir -p /usr/app/node_modules && chown -R node:node /usr/app

WORKDIR /usr/app

COPY . .

USER node

RUN yarn install --silent \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --silent --production

# Final version
FROM node:16-alpine as FINAL

WORKDIR /usr/app

USER node

COPY --chown=node:node --from=BUILDER /usr/app/ ./

EXPOSE 9229
EXPOSE 3333

CMD ["yarn", "start"]