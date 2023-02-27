package cadastro.backend.services;

import cadastro.backend.dtos.CadastroDto;
import cadastro.backend.models.CadastroModel;
import cadastro.backend.repositories.CadastroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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


    public ResponseEntity<Object> findById(UUID id) {
        Optional<CadastroModel> cadastroModelOptional = cadastroRepository.findById(id);
        if(cadastroModelOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(cadastroModelOptional.get());
    }

    public void deleteById(UUID id) {
        cadastroRepository.deleteById(id);
    }

    public CadastroModel updateCadastro(UUID id, CadastroDto cadastroDto) {
        Optional<CadastroModel> cadastroModelOptional2 = cadastroRepository.findById(id);
        var cadastroModel = new CadastroModel();
        BeanUtils.copyProperties(cadastroDto, cadastroModel);
        cadastroModel.setId(cadastroModelOptional2.get().getId());
        return cadastroRepository.save(cadastroModel);
    }
}
