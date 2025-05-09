FROM node:22 as builder

ENV HOST=0.0.0.0

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev

RUN npm i -g pnpm
COPY  . .
RUN pnpm install
RUN pnpm build

FROM node:22-alpine as runner
ENV PORT=3000

RUN corepack enable
RUN npm i -g corepack@latest

WORKDIR /app
COPY --from=builder /app ./


CMD ["pnpm", "start" ]
