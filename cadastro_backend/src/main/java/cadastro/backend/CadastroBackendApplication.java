package cadastro.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@SpringBootApplication
public class CadastroBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CadastroBackendApplication.class, args);
	}
	@GetMapping("/")
	public String index(){
		return ("Cadastro de Pessoas");
	}

}
