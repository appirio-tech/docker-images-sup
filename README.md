# docker-images-sup
Supply docker images


## admin-challenge-mock
Mocks for 
* FileService - /v3/files/uploadurl 
* challengeService - /v3/challenges/{id} - 30049240 (Develop Challenge), 30049241 (Design Challenge)
* Member service - /v3/members/{handle} - yoda , han_solo, r2d2, darth_vader
RUN 
`> docker run -p 9000:9000 parthshah/mock-admin-challenge`


## submission-microservice
RUN 
`docker run -p 8080:8080 -e "CHALLENGE_SERVICE_ENDPOINT=http://192.168.99.100:9000/v3/" -e "FILE_SERVICE_ENDPOINT=http://192.168.99.100:9000/v3/" -e "ZOOKEEPER_HOSTS_LIST=192.168.99.100:2181" parthshah/tc-submission-microservice`