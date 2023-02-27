import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

export const getPessoas = async () => {
  const response = await api.get(`/cadastro`);
  return response.data;
};

export const getPessoaId = async (id) => {
  const response = await api.get(`/cadastro/${id}`);
  return response.data;
};

export const postPessoa = async (data) => {
  await api.post(`/cadastro`, data);
};

export const deletPessoa = async (id) => {
  await api.delete(`/cadastro/${id}`);
};

export const updatePessoa = async (id, data) => {
  await api.put(`/cadastro/${id}`, data);
};
