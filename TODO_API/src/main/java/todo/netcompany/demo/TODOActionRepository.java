package todo.netcompany.demo;

import org.springframework.data.jpa.repository.JpaRepository;

interface TODOActionRepository extends JpaRepository<TODOAction, Long> {

}
