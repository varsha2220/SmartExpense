import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Row,
    Col,
    Button,
    Form,
    Table
} from "react-bootstrap";

import api from "../services/api";

export default function IncomePage() {

    const navigate = useNavigate();

    const [income, setIncome] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    useEffect(() => {

        loadIncome();

    }, []);

    const loadIncome = async () => {

        try {

            const res = await api.get("/income");

            setIncome(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const deleteIncome = async (id) => {

        if (!window.confirm("Delete Income?"))

            return;

        try {

            await api.delete(`/income/${id}`);

            loadIncome();

        }

        catch (err) {

            alert("Unable to Delete");

        }

    };

    const filteredIncome = useMemo(() => {

        return income.filter(item => {

            const matchSearch =

                item.title

                    .toLowerCase()

                    .includes(search.toLowerCase());

            const matchCategory =

                category === ""

                ||

                item.category === category;

            return matchSearch && matchCategory;

        });

    }, [income, search, category]);

    const totalIncome = filteredIncome.reduce(

        (sum, item) =>

            sum + Number(item.amount),

        0

    );

    const today = new Date()

        .toISOString()

        .split("T")[0];

    const todayIncome = filteredIncome

        .filter(item => item.date === today)

        .reduce(

            (sum, item) =>

                sum + Number(item.amount),

            0

        );

    const currentMonth = new Date().getMonth();

    const currentYear = new Date().getFullYear();

    const monthlyIncome = filteredIncome

        .filter(item => {

            const d = new Date(item.date);

            return (

                d.getMonth() === currentMonth

                &&

                d.getFullYear() === currentYear

            );

        })

        .reduce(

            (sum, item) =>

                sum + Number(item.amount),

            0

        );

    return (

        <Container className="mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    💰 Income Dashboard

                </h2>

                <Button

                    onClick={() =>

                        navigate("/add-income")

                    }

                >

                    + Add Income

                </Button>

            </div>

            <Row>

                <Col md={4}>

                    <Card className="shadow mb-3">

                        <Card.Body>

                            <h5>

                                Total Income

                            </h5>

                            <h2>

                                ₹{totalIncome}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={4}>

                    <Card className="shadow mb-3">

                        <Card.Body>

                            <h5>

                                Today's Income

                            </h5>

                            <h2>

                                ₹{todayIncome}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={4}>

                    <Card className="shadow mb-3">

                        <Card.Body>

                            <h5>

                                This Month

                            </h5>

                            <h2>

                                ₹{monthlyIncome}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Card className="shadow">

                <Card.Body>

                    <Row className="mb-4">

                        <Col md={6}>

                            <Form.Control

                                placeholder="Search Income"

                                value={search}

                                onChange={(e)=>

                                    setSearch(

                                        e.target.value

                                    )

                                }

                            />

                        </Col>

                        <Col md={6}>

                            <Form.Select

                                value={category}

                                onChange={(e)=>

                                    setCategory(

                                        e.target.value

                                    )

                                }

                            >

                                <option value="">

                                    All Categories

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

                        </Col>

                    </Row>
                                        <Table striped bordered hover responsive>

                        <thead>

                            <tr>

                                <th>Title</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Note</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredIncome.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >

                                            No Income Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredIncome.map(item => (

                                        <tr key={item.id}>

                                            <td>

                                                {item.title}

                                            </td>

                                            <td>

                                                {item.category}

                                            </td>

                                            <td>

                                                ₹{item.amount}

                                            </td>

                                            <td>

                                                {item.date}

                                            </td>

                                            <td>

                                                {item.note}

                                            </td>

                                            <td>

                                                <Button

                                                    variant="warning"

                                                    size="sm"

                                                    onClick={() =>

                                                        navigate(

                                                            `/edit-income/${item.id}`

                                                        )

                                                    }

                                                >

                                                    Edit

                                                </Button>

                                            </td>

                                            <td>

                                                <Button

                                                    variant="danger"

                                                    size="sm"

                                                    onClick={() =>

                                                        deleteIncome(

                                                            item.id

                                                        )

                                                    }

                                                >

                                                    Delete

                                                </Button>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

            <Card className="shadow mt-4">

                <Card.Body>

                    <h4>

                        📈 Income Summary

                    </h4>

                    <hr />

                    <Row>

                        <Col md={4}>

                            <h5>

                                Total Income

                            </h5>

                            <h3>

                                ₹{totalIncome}

                            </h3>

                        </Col>

                        <Col md={4}>

                            <h5>

                                Today's Income

                            </h5>

                            <h3>

                                ₹{todayIncome}

                            </h3>

                        </Col>

                        <Col md={4}>

                            <h5>

                                Monthly Income

                            </h5>

                            <h3>

                                ₹{monthlyIncome}

                            </h3>

                        </Col>

                    </Row>

                </Card.Body>

            </Card>

        </Container>

    );

}