package todo.netcompany.demo;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class TODOAction {

    private @Id @GeneratedValue() Long id;
    private String name;
    private String style;
    private String disabled;
    private String finish_unfinishButtonText;
    private String finish_unfinishButtonIcon;

    TODOAction() {}

    public TODOAction(String name, String style, String disabled, String finish_unfinishButtonText, String finish_unfinishButtonIcon) {
        this.name = name;
        this.style = style;
        this.disabled = disabled;
        this.finish_unfinishButtonText = finish_unfinishButtonText;
        this.finish_unfinishButtonIcon = finish_unfinishButtonIcon;
    }
}
