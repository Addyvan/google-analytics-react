FROM mhart/alpine-node 
WORKDIR /
COPY . .
RUN yarn
RUN ls
RUN yarn add global serve
EXPOSE 5000
CMD [ "yarn", "serve", "-s", "build"]