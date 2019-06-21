FROM mhart/alpine-node 
WORKDIR /
COPY . .
RUN yarn add serve
EXPOSE 5000
CMD [ "yarn", "serve", "-s", "build"]