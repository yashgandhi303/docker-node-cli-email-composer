FROM node:14.5.0
# EXPOSE 4000
WORKDIR /server
COPY ./package.json .
RUN yarn install
COPY . ./
ENTRYPOINT ["yarn", "start"]