package cadastro.backend.controllers;

import cadastro.backend.dtos.CadastroDto;
import cadastro.backend.models.CadastroModel;
import cadastro.backend.services.CadastroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/cadastro")
public class CadastroController {

    final CadastroService cadastroService;

    public CadastroController(CadastroService cadastroService) {
        this.cadastroService = cadastroService;
    }

    @PostMapping
    public ResponseEntity<Object> saveNewCadastro(@RequestBody @Valid CadastroDto cadastroDto){
        return  cadastroService.saveCadastro(cadastroDto);
    }

    @GetMapping
    public List<CadastroModel>getAllCadastros(){
        return cadastroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CadastroModel> getById(@PathVariable(value = "id") UUID id){
        return cadastroService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(value = "id")UUID id){
        cadastroService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CadastroModel> updateCadastro(@PathVariable(value = "id")UUID id,
                                        @RequestBody @Valid CadastroDto cadastroDto){
        return cadastroService.updateCadastro(id,cadastroDto);
    }

}
