ARG node_version=node:lts
ARG nginx_version=nginx:1.21.3-alpine
ARG sonarscanner_version=sonarsource/sonar-scanner-cli

FROM $node_version as image
WORKDIR /usr/app
COPY ./package*.json ./

FROM image AS build
RUN npm pkg set scripts.prepare="husky install"
RUN npm ci
COPY . .
RUN npm run test:coverage
RUN npm run webpack

FROM $sonarscanner_version as sonar
ARG sonarscanner_params=-Dsonar.host.url=http://localhost:9000
COPY --from=build ./usr/app .
RUN sonar-scanner $sonarscanner_params

FROM $nginx_version
COPY ./nginx/https-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./usr/app/dist /usr/share/nginx/html/widget
COPY ./public/favicon.ico /usr/share/nginx/html/widget
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
