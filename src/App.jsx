import { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    priority: "Basse",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tâche soumise :", formData);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Ajouter une tâche</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="taskName">
                  <Form.Label>Nom de la tâche</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dueDate">
                  <Form.Label>Date d’échéance</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="priority">
                  <Form.Label>Priorité</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Elevée">Elevée</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="isCompleted">
                  <Form.Check
                    type="checkbox"
                    label="Tâche complétée"
                    name="isCompleted"
                    checked={formData.isCompleted}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Ajouter la tâche
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
