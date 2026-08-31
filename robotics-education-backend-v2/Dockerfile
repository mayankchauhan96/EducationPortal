# syntax=docker/dockerfile:1.7

FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /workspace

COPY pom.xml ./

RUN mvn -q -DskipTests dependency:go-offline

COPY src ./src

RUN mvn -q -DskipTests clean package

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

RUN addgroup --system spring && adduser --system --ingroup spring spring

COPY --from=build /workspace/target/*.jar /app/app.jar

ENV PORT=8080

EXPOSE 8080

USER spring:spring

ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar --server.port=${PORT}"]