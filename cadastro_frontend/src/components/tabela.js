import { useEffect, useState } from "react";
import {
  deletPessoa,
  getPessoaId,
  getPessoas,
  updatePessoa,
} from "../utils/api";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "react-modal";
import { Button, DivInput, Input, Label, Td, Th } from "../style/style";

export default function Tabela({ buscar, setBuscar }) {
  const [dados, setDados] = useState();
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [cpf, setCpf] = useState();
  const [estadoCivil, setEstadoCivil] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (buscar) {
      carregarDados();
      setBuscar(false);
    }
  }, [buscar]);

  const carregarDados = async () => {
    try {
      const pessoas = await getPessoas();
      setDados(pessoas);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const apagar = async (id) => {
    try {
      await deletPessoa(id);
    } catch (e) {
      console.log("Erro ao apagar:>> ", e);
    }
    carregarDados();
  };

  const editar = async (id) => {
    setShowModal(true);
    try {
      const pessoa = await getPessoaId(id);
      if (pessoa?.body) {
        setNome(pessoa?.body?.nome);
        setIdade(pessoa?.body?.idade);
        setCpf(pessoa?.body?.cpf);
        setEstadoCivil(pessoa?.body?.estadoCivil);
        setId(pessoa?.body?.id);
      }
    } catch (e) {
      console.log("ERRO :>> ", e);
    }
  };

  const salvar = async (id) => {
    const data = {
      nome: nome,
      cpf: cpf,
      idade: parseInt(idade),
      estadoCivil: estadoCivil,
    };
    try {
      await updatePessoa(id, data);
    } catch (e) {
      console.log("ERRO :>> ", e);
    }
    carregarDados();
    setShowModal(false);
  };

  function renderItens() {
    return (
      <div>
        <Table
          // striped
          bordered
          // hover
        >
          <thead>
            <tr>
              <Th>NOME</Th>
              <Th>IDADE</Th>
              <Th>CPF</Th>
              <Th>ESTADO CIVIL</Th>
              <Th>EDITAR</Th>
              <Th>APAGAR</Th>
            </tr>
          </thead>

          <tbody>
            {dados.map((dado, i) => (
              <tr key={i}>
                <Td>{dado.nome}</Td>
                <Td>{dado.idade}</Td>
                <Td>{dado.cpf}</Td>
                <Td>{dado.estadoCivil}</Td>
                <Td>
                  <AiOutlineEdit onClick={() => editar(dado.id)} />
                </Td>
                <Td>
                  <AiOutlineDelete onClick={() => apagar(dado.id)} />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {renderModal()}
      </div>
    );
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: 10,
      width: "50%",
    },
  };

  const renderModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
      >
        <div>
          <h1 style={{ fontWeight: "bold", color: "#2f4f4f" }}>
            Atualizar cadastro
          </h1>
          <div
            style={{
              background: "#2f4f4f",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: 20,
              borderRadius: 10,
            }}
          >
            <DivInput>
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </DivInput>

            <DivInput>
              <Label>Idade</Label>
              <Input value={idade} onChange={(e) => setIdade(e.target.value)} />
            </DivInput>

            <DivInput>
              <Label>Estado Civil</Label>
              <Input
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
              />
            </DivInput>

            <DivInput>
              <Label>Cpf</Label>
              <Input value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </DivInput>
            <div
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Button onClick={() => salvar(id)}>Salvar</Button>
              <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ paddingLeft: 30, paddingTop: 40 }}>
      <h1 style={{ fontWeight: "bold", marginBottom: 50, color: "#fff" }}>
        Tabela
      </h1>

      {!dados?.length ? (
        <div style={{ marginTop: 40 }}>
          <h4 style={{ color: "#fff" }}>Sem cadastros</h4>
        </div>
      ) : (
        renderItens()
      )}
    </div>
  );
}
