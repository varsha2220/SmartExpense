import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";

import api from "../services/api";

export default function AddIncome() {

    const navigate = useNavigate();

    const [income, setIncome] = useState({

        title: "",

        amount: "",

        category: "",

        date: "",

        note: ""

    });

    const handleChange = (e) => {

        setIncome({

            ...income,

            [e.target.name]: e.target.value

        });

    };

    const saveIncome = async (e) => {

        e.preventDefault();

        try {

            await api.post("/income", {

                ...income,

                amount: Number(income.amount)

            });

            alert("Income Added Successfully");

            navigate("/income");

        }

        catch (err) {

            console.log(err);

            alert("Failed to Add Income");

        }

    };

    return (

        <Container className="mt-5">

            <Card className="shadow-lg">

                <Card.Body>

                    <h2 className="mb-4">

                        💰 Add Income

                    </h2>

                    <Form onSubmit={saveIncome}>

                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Title

                                    </Form.Label>

                                    <Form.Control

                                        name="title"

                                        value={income.title}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Amount

                                    </Form.Label>

                                    <Form.Control

                                        type="number"

                                        name="amount"

                                        value={income.amount}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                        </Row>

                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Category

                                    </Form.Label>

                                    <Form.Select

                                        name="category"

                                        value={income.category}

                                        onChange={handleChange}

                                        required

                                    >

                                        <option value="">

                                            Select

                                        </option>

                                        <option>

                                            Salary

                                        </option>

                                        <option>

                                            Freelancing

                                        </option>

                                        <option>

                                            Business

                                        </option>

                                        <option>

                                            Investment

                                        </option>

                                        <option>

                                            Bonus

                                        </option>

                                        <option>

                                            Rental Income

                                        </option>

                                        <option>

                                            Gift

                                        </option>

                                        <option>

                                            Refund

                                        </option>

                                        <option>

                                            Other

                                        </option>

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Date

                                    </Form.Label>

                                    <Form.Control

                                        type="date"

                                        name="date"

                                        value={income.date}

                                        onChange={handleChange}

                                        required

                                    />

                                </Form.Group>

                            </Col>

                        </Row>

                        <Form.Group className="mb-4">

                            <Form.Label>

                                Note

                            </Form.Label>

                            <Form.Control

                                as="textarea"

                                rows={4}

                                name="note"

                                value={income.note}

                                onChange={handleChange}

                            />

                        </Form.Group>

                        <div className="d-flex justify-content-between">

                            <Button

                                variant="secondary"

                                onClick={() => navigate("/income")}

                            >

                                Cancel

                            </Button>

                            <Button

                                variant="success"

                                type="submit"

                            >

                                Save Income

                            </Button>

                        </div>

                    </Form>

                </Card.Body>

            </Card>

        </Container>

    );

}