import styled from "styled-components";

export const Input = styled.input`
  width: 400px;
  height: 45px;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 0;
  padding-left: 20px;
  font-size: 18px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`;

export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: linear-gradient(90deg, #2f4f4f 0%, gray 50%, #2f4f4f 100%);
`;

export const Button = styled.button`
  background-color: darkgray;
  color: white;
  width: 170px;
  height: 50px;
  border: 0;
  border-radius: 7px;
  font-weight: bold;
  font-size: 18px;
  :hover {
    background-color: lightgrey;
    color: black;
  }
`;

export const Th = styled.th`
  color: #fff;
`;

export const Td = styled.td`
  color: #fff;
`;
