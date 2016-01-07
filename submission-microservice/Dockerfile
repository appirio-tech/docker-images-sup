FROM parthshah/base-java

RUN wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest -O dynamo.tar.gz
RUN mkdir dynamodb_local
RUN tar xvzf dynamo.tar.gz -C ./dynamodb_local && rm -f dynamo.tar.gz && \
    rm dynamodb_local/DynamoDBLocal_lib/*win32* && \
    rm dynamodb_local/DynamoDBLocal_lib/*osx*

WORKDIR /data

ADD submission-service-1.0.1-SNAPSHOT.jar ./submission.jar
ADD config.yml ./config.yml
ADD aws_creds ./aws_creds
ADD run ./run
RUN chmod +x ./run

ENV CHALLENGE_SERVICE_ENDPOINT http://localhost:8010/v3/
ENV FILE_SERVICE_ENDPOINT  http://localhost:8010/v3/
ENV ZOOKEEPER_HOSTS_LIST localhost:2181
ENV AWS_CONFIG_FILE /data/aws_creds
# ENV AWS_SECRET_ACCESS_KEY bogus
# ENV AWS_ACCESS_KEY_ID bogus
# ENV AWS_DEFAULT_REGION us-east-1


CMD ./run

EXPOSE 8080 8081

