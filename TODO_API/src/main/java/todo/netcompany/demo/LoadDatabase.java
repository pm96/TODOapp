package todo.netcompany.demo;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(TODOActionRepository repository){
        return args -> {
            log.info("Preloading " + repository.save(new TODOAction("Get groceries", "ui clearing segment", "", "Finish", "check icon")));
            log.info("Preloading " + repository.save(new TODOAction("walk a walk", "ui clearing segment", "", "Finish", "check icon")));
            log.info("Preloading " + repository.save(new TODOAction("Dance wildly", "ui clearing segment", "", "Finish", "blind icon")));
            log.info("Preloading " + repository.save(new TODOAction("Run a 10k", "ui clearing segment", "", "Finish", "check icon")));
        };
    }
}
