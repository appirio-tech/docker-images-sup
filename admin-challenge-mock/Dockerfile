FROM gliderlabs/alpine:3.1

RUN apk add --update nodejs

ENV PORT 8010

COPY . /src

EXPOSE  8010
CMD ["node", "/src/index.js", "8010", "/src/db.json"]
