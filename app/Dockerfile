FROM node:14.5.0
# EXPOSE 3000
WORKDIR /app
RUN yarn global add serve
COPY ./package.json .
RUN yarn install
COPY . ./
RUN yarn build
ENTRYPOINT ["yarn", "start"]