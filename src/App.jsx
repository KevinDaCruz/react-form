import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .max(15, "Le nom ne doit pas dépasser 15 caractères")
    .required("Champ requis"),
  dueDate: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Le format doit être jj/mm/aaaa"
    )
    .test(
      "is-valid-date",
      "La date ne peut pas être antérieure à aujourd'hui",
      (value) => {
        if (!value) return false;

        const [day, month, year] = value.split("/").map(Number);
        const enteredDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return enteredDate >= today;
      }
    )
    .required("Champ requis"),
  priority: yup
    .string()
    .oneOf(["Basse", "Moyenne", "Elevée"], "Priorité invalide")
    .required("Champ requis"),
  isCompleted: yup.boolean(),
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "Basse",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Tâche soumise :", data);
    reset();
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
                    {...register("name")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="dueDate">
                  <Form.Label>Date d’échéance (jj/mm/aaaa)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="jj/mm/aaaa"
                    {...register("dueDate")}
                    isInvalid={!!errors.dueDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dueDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="priority">
                  <Form.Label>Priorité</Form.Label>
                  <Form.Select
                    {...register("priority")}
                    isInvalid={!!errors.priority}
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Elevée">Elevée</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.priority?.message}
                  </Form.Control.Feedback>
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
