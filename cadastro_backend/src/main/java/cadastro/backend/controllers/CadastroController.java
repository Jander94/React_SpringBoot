package cadastro.backend.controllers;

import cadastro.backend.dtos.CadastroDto;
import cadastro.backend.models.CadastroModel;
import cadastro.backend.services.CadastroService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    public ResponseEntity<List<CadastroModel>> getAllCadastros(){
        var cadastros = cadastroService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(cadastros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable(value = "id") UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(cadastroService.findById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(value = "id")UUID id){
        cadastroService.deleteById(id);
    }

    @PutMapping("/{id}")
    public CadastroModel updateCadastro(@PathVariable(value = "id")UUID id,
                                        @RequestBody @Valid CadastroDto cadastroDto){
        return cadastroService.updateCadastro(id,cadastroDto);
    }

}
