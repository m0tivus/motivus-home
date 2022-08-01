#eval $(minikube docker-env)
#docker build -t motivus/home:latest --build-arg MARKETPLACE_API_URL="http://api.marketplace.motivus.clx/" .

FROM node:16.14-alpine as build
ARG MARKETPLACE_API_URL
ENV GATSBY_MARKETPLACE_API_URL=$MARKETPLACE_API_URL
WORKDIR /usr/src/app
RUN yarn global add gatsby-cli && gatsby telemetry --disable

COPY package.json yarn.lock ./
RUN yarn

ADD src ./src 
ADD static ./static
ADD gatsby* loadershim.js 404.js ./
RUN ls -la /usr/src/app && yarn build

FROM nginx:1.17-alpine
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

