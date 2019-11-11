package io.privalou.crud;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EntityScan(basePackageClasses = {
        ApplicationTests.class,
        Jsr310JpaConverters.class
})
@SpringBootTest
class ApplicationTests {

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    @Test
    void contextLoads() {
    }

}
