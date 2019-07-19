package todo.netcompany.demo;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

@Component
class TODOActionsResourceAssembler implements ResourceAssembler<TODOAction, Resource<TODOAction>> {

    @Override
    public Resource<TODOAction> toResource(TODOAction todoAction) {
        return new Resource<>(todoAction,
                linkTo(methodOn(TODOActionController.class).one(todoAction.getId())).withSelfRel(),
                linkTo(methodOn(TODOActionController.class).all()).withRel("TODOActions"));
    }
}
