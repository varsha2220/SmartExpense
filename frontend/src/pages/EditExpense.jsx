import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

export default function EditExpense() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: ""
    });

    useEffect(() => {
        loadExpense();
    }, []);

    const loadExpense = async () => {
        try {

            const res = await api.get(`/expense/${id}`);

            setExpense({
                title: res.data.title,
                amount: res.data.amount,
                category: res.data.category,
                date: res.data.date,
                note: res.data.note
            });

        } catch (err) {
            console.log(err);
            alert("Unable to load expense");
        }
    };

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });

    };

    const updateExpense = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/expense/${id}`, expense);

            alert("Expense Updated Successfully");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            alert("Update Failed");

        }

    };

    return (

        <Container className="mt-5">

            <Card className="shadow p-4">

                <h2 className="mb-4">
                    Edit Expense
                </h2>

                <Form onSubmit={updateExpense}>

                    <Row>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>Title</Form.Label>

                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={expense.title}
                                    onChange={handleChange}
                                    required
                                />

                            </Form.Group>

                        </Col>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>Amount</Form.Label>

                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={expense.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </Form.Group>

                        </Col>

                    </Row>

                    <Row>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>Category</Form.Label>

                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={expense.category}
                                    onChange={handleChange}
                                    required
                                />

                            </Form.Group>

                        </Col>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>Date</Form.Label>

                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={expense.date}
                                    onChange={handleChange}
                                    required
                                />

                            </Form.Group>

                        </Col>

                    </Row>

                    <Form.Group className="mb-3">

                        <Form.Label>Note</Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="note"
                            value={expense.note}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    <Button
                        variant="success"
                        type="submit"
                        className="me-2"
                    >
                        Update Expense
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/dashboard")}
                    >
                        Cancel
                    </Button>

                </Form>

            </Card>

        </Container>

    );

}