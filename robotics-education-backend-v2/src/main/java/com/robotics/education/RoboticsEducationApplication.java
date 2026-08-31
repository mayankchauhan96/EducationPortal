package com.robotics.education;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RoboticsEducationApplication {
    public static void main(String[] args) {
        System.setProperty("user.timezone", "UTC");
        SpringApplication.run(RoboticsEducationApplication.class, args);
    }
}
