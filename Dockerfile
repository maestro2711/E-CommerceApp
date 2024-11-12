FROM --platform=linux/amd64 openjdk:21
LABEL maintainer="asmitterand@yahoo.fr"
EXPOSE 8081
ADD Backend/target/app.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]