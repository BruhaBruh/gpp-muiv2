FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn global add serve

COPY . .

ENV REACT_APP_LITE_COLOR=#c27c0e
ENV REACT_APP_PREMIUM_COLOR=#71368a
ENV PORT=4200

CMD yarn build && serve -s build -l $PORT
