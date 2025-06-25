import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "Basse",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Tâche soumise :", data);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Ajouter une tâche</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="taskName">
                  <Form.Label>Nom de la tâche</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("name", { required: "Ce champ est requis" })}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="dueDate">
                  <Form.Label>Date d’échéance</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("dueDate", { required: "Champ requis" })}
                    isInvalid={!!errors.dueDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dueDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="priority">
                  <Form.Label>Priorité</Form.Label>
                  <Form.Select {...register("priority")}>
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Elevée">Elevée</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="isCompleted">
                  <Form.Check
                    type="checkbox"
                    label="Tâche complétée"
                    {...register("isCompleted")}
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
