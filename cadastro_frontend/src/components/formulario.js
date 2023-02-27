import { Alert } from "bootstrap";
import React, { useState } from "react";
import { Button, DivInput, Input, Label } from "../style/style";
import { postPessoa } from "../utils/api";

export default function Formulario({ setBuscar }) {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [cpf, setCpf] = useState();
  const [estadoCivil, setEstadoCivil] = useState();

  async function salvar() {
    const data = {
      nome: nome,
      cpf: cpf,
      idade: parseInt(idade),
      estadoCivil: estadoCivil,
    };
    try {
      await postPessoa(data);
    } catch (e) {
      alert(e.response.data);
      console.log("Erro ao salvar:>> ", e.response.data);
    }
    setNome("");
    setIdade("");
    setCpf("");
    setEstadoCivil("");
    setBuscar(true);
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingTop: 50,
        paddingLeft: 20,
      }}
    >
      <div>
        <h1 style={{ fontWeight: "bold", color: "#fff" }}>Novo Cadastro</h1>

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

        <Button onClick={() => salvar()}>Salvar</Button>
      </div>
    </div>
  );
}
