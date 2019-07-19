package todo.netcompany.demo;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class TODOActionController {

    private final TODOActionRepository repository;

    private final TODOActionsResourceAssembler assembler;

    public TODOActionController(TODOActionRepository repository,
                                TODOActionsResourceAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    // Aggregate root

    @GetMapping("/TODOActions")
    Resources<Resource<TODOAction>> all() {
        List<Resource<TODOAction>> actions = repository.findAll().stream()
                .map(assembler::toResource)
                .collect(Collectors.toList());

        return new Resources<>(actions,
                linkTo(methodOn(TODOActionController.class).all()).withSelfRel());
    }

    @PostMapping("/TODOActions")
    ResponseEntity<?> newTODOAction(@RequestBody TODOAction newTODOAction) throws URISyntaxException{
        Resource<TODOAction> resouce = assembler.toResource(repository.save(newTODOAction));
        System.out.println(resouce);
        return ResponseEntity
                .created(new URI(resouce.getId().expand().getHref()))
                .body(resouce);
    }

    // Single item
    @GetMapping("/TODOActions/{id}")
    Resource<TODOAction> one(@PathVariable Long id) {

        TODOAction action = repository.findById(id)
                .orElseThrow(() -> new TODOActionNotFoundException(id));

        return assembler.toResource(action);
    }

    @PutMapping("/TODOActions/{id}")
    ResponseEntity<?> replaceTODOAction(@RequestBody TODOAction newTODOAction, @PathVariable Long id) throws URISyntaxException{
        TODOAction updatedTODOAction = repository.findById(id)
            .map(action -> {
                action.setName(newTODOAction.getName());
                action.setDisabled(newTODOAction.getDisabled());
                action.setFinish_unfinishButtonIcon(newTODOAction.getFinish_unfinishButtonIcon());
                action.setFinish_unfinishButtonText(newTODOAction.getFinish_unfinishButtonText());
                action.setStyle(newTODOAction.getStyle());
                return repository.save(action);
            })
            .orElseGet(() -> {
                newTODOAction.setId(id);
                return repository.save(newTODOAction);
            });

        Resource<TODOAction> resource = assembler.toResource(updatedTODOAction);

        return ResponseEntity
                .created(new URI(resource.getId().expand().getHref()))
                .body(resource);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    ResponseEntity<?> deleteTODOAction(@PathVariable Long id){
        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

}
