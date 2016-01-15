FROM jeanblanchard/busybox-java:8

ADD submission-service-1.0.1-SNAPSHOT.jar ./submission.jar
ADD config.yml ./config.yml
ADD kafka.properties .

EXPOSE 8080 8081

CMD java -Ddw.identityServiceClient.endpoint="$IDENTITY_SERVICE_ENDPOINT" -Ddw.challengeServiceClient.endpoint="$CHALLENGE_SERVICE_ENDPOINT" -Ddw.fileServiceClient.endpoint="$FILE_SERVICE_ENDPOINT" -Ddw.dynamodbEndpoint="$DYNAMODB_ENDPOINT" -jar submission.jar server config.yml

