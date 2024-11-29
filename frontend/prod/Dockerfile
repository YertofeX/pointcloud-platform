FROM node:22.9.0-alpine AS build

RUN mkdir /frontend
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json
WORKDIR /frontend
RUN npm ci
COPY . /frontend

ENV VITE_API /api/
RUN npm run build

FROM nginx:1.27.3

COPY --from=build /frontend/dist /usr/share/nginx/html
COPY prod/default.conf /etc/nginx/conf.d/default.conf