FROM gliderlabs/alpine:3.1

RUN apk add --update nodejs

COPY . /src

EXPOSE  8010
CMD ["node", "/src/index.js"]
