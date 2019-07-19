package todo.netcompany.demo;

public class TODOActionNotFoundException extends RuntimeException {
    public TODOActionNotFoundException(Long id) {
        super("Could not find TODOAction " + id);
    }
}
