FROM parthshah/base-java

RUN wget http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest -O dynamo.tar.gz
RUN mkdir dynamodb_local
RUN tar xvzf dynamo.tar.gz -C ./dynamodb_local && rm -f dynamo.tar.gz && \
    rm dynamodb_local/DynamoDBLocal_lib/*win32* && \
    rm dynamodb_local/DynamoDBLocal_lib/*osx*

RUN java -Djava.library.path=/dynamodb_local/DynamoDBLocal_lib -jar /dynamodb_local/DynamoDBLocal.jar >> /dev/null &

WORKDIR /data

ADD submission-service-1.0.1-SNAPSHOT.jar ./submission.jar
ADD config.yml ./config.yml
ADD aws_creds ./aws_creds


ENV CHALLENGE_SERVICE_ENDPOINT http://localhost:8010/v3/
ENV FILE_SERVICE_ENDPOINT  http://localhost:8010/v3/
ENV ZOOKEEPER_HOSTS_LIST localhost:2181
ENV AWS_CONFIG_FILE /data/aws_creds
# ENV AWS_SECRET_ACCESS_KEY bogus
# ENV AWS_ACCESS_KEY_ID bogus
# ENV AWS_DEFAULT_REGION us-east-1


# setup Dynamodb
RUN aws dynamodb create-table --table-name Submissions --attribute-definitions AttributeName=id,AttributeType=S AttributeName=userId,AttributeType=N AttributeName=referenceLookup,AttributeType=S --key-schema AttributeName=id,KeyType=HASH AttributeName=userId,KeyType=RANGE --global-secondary-indexes '[{"IndexName":"referenceLookup-index","KeySchema":[{"AttributeName":"referenceLookup","KeyType":"HASH"},{"AttributeName":"userId","KeyType":"RANGE"}],"Projection":{"ProjectionType":"ALL"}, "ProvisionedThroughput": {"ReadCapacityUnits": 2, "WriteCapacityUnits": 2}}]' --region us-east-1 --provisioned-throughput ReadCapacityUnits=4,WriteCapacityUnits=2 --endpoint-url http://localhost:8000 >> /dev/null &

CMD java -Ddw.challengeServiceClient.endpoint="$CHALLENGE_SERVICE_ENDPOINT" -Ddw.fileServiceClient.endpoint="$FILE_SERVICE_ENDPOINT" -Ddw.dynamodbEndpoint=http://localhost:8000 -jar /data/submission.jar server /data/config.yml

EXPOSE 8080 8081

