import { useState } from "react";
import Formulario from "./components/formulario";
import Tabela from "./components/tabela";
import { DivContainer } from "./style/style";
import "./app.css";

function App() {
  const [buscar, setBuscar] = useState(false);

  return (
    <DivContainer>
      <div style={{ width: "50%", borderRight: "2px dotted white" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Formulario setBuscar={setBuscar} />
        </div>
      </div>

      <div style={{ width: "50%", paddingRight: 20 }}>
        <Tabela buscar={buscar} setBuscar={setBuscar} />
      </div>
    </DivContainer>
  );
}

export default App;
