package cadastro.backend.services;

import cadastro.backend.dtos.CadastroDto;
import cadastro.backend.models.CadastroModel;
import cadastro.backend.repositories.CadastroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CadastroService {
    final CadastroRepository cadastroRepository;

    public CadastroService(CadastroRepository cadastroRepository) {
        this.cadastroRepository = cadastroRepository;
    }

    public boolean existsByCpf(String cpf) {
       return cadastroRepository.existsByCpf(cpf);
    }
    @Transactional
    public CadastroModel save(CadastroModel cadastroModel) {
        return cadastroRepository.save(cadastroModel);
    }

    public List<CadastroModel> findAll() {
        return cadastroRepository.findAll();
    }

    public ResponseEntity<Object> saveCadastro(CadastroDto cadastroDto){
        if(existsByCpf(cadastroDto.getCpf())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflito: cpf já cadastrado.");
        }

        var cadastroModel = new CadastroModel();
        BeanUtils.copyProperties(cadastroDto, cadastroModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(save(cadastroModel));
    }


    public ResponseEntity<CadastroModel> findById(UUID id) {
        CadastroModel cadastroModel = cadastroRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID INVÁLIDO"));
        return ResponseEntity.status(HttpStatus.OK).body(cadastroModel);
    }

    public void deleteById(UUID id) {
        cadastroRepository.deleteById(id);
    }

    public ResponseEntity<CadastroModel> updateCadastro(UUID id, CadastroDto cadastroDto) {
        CadastroModel pessoa = cadastroRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID INVÁLIDO."));
        var cadastroModel = new CadastroModel();
        BeanUtils.copyProperties(cadastroDto, cadastroModel);
        cadastroModel.setId(pessoa.getId());
        return ResponseEntity.status(HttpStatus.OK).body(cadastroRepository.save(cadastroModel));
    }
}
