FROM develar/java:8u45

RUN apk update
RUN apk add curl
RUN apk add tar

WORKDIR "/dynamodb"

RUN curl -L http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest | tar xz

ENTRYPOINT ["java", "-Djava.library.path=./DynamoDBLocal_lib", "-jar", "DynamoDBLocal.jar"]

CMD ["-help"]
