package todo.netcompany.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class TODOActionNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(TODOActionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String todoActionNOtFOundHandler(TODOActionNotFoundException ex){
        return ex.getMessage();
    }
}
