import { Button, Col, Container, Input, Label, Row } from "reactstrap";
import "./App.css";
import DataSets from "./DataSets";
import LineChart from "./LineChart";

function App() {  
  return (
    <>
      <Container>
        <Label>Nava Cuellar José De Jesús</Label>
        <Row>
          <Col>
            <div style={{ width: "1000px" }}>
            </div>
            <DataSets/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;