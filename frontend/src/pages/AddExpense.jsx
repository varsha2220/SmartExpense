import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Form,
    Button,
    Row,
    Col,
    Alert
} from "react-bootstrap";

import api from "../services/api";

export default function AddExpense() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [warning, setWarning] = useState("");

    const [expense, setExpense] = useState({

        title: "",

        amount: "",

        category: "",

        paymentMethod: "Cash",

        priority: "Medium",

        recurring: false,

        date: "",

        note: "",

        receipt: null

    });

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try{

            const res = await api.get("/category");

            setCategories(res.data);

        }

        catch{

            console.log("Unable to Load Categories");

        }

    };

    const handleChange = (e) => {

        const {name,value,type,checked} = e.target;

        setExpense({

            ...expense,

            [name]:

                type==="checkbox"

                ?

                checked

                :

                value

        });

    };

    const handleReceipt = (e)=>{

        setExpense({

            ...expense,

            receipt:e.target.files[0]

        });

    };

    useEffect(()=>{

        if(Number(expense.amount)>10000){

            setWarning(

                "⚠ Large Expense! Double check before saving."

            );

        }

        else{

            setWarning("");

        }

    },[expense.amount]);

    const saveExpense = async(e)=>{

        e.preventDefault();

        try{

            const data={

                ...expense,

                amount:Number(expense.amount)

            };

            await api.post("/expense",data);

            alert("Expense Added Successfully");

            navigate("/dashboard");

        }

        catch(err){

            console.log(err);

            alert("Failed to Add Expense");

        }

    };

    return(

        <Container className="mt-5">

            <Card className="shadow-lg">

                <Card.Body>

                    <h2>

                        💳 Add Expense

                    </h2>

                    <hr/>

                    {

                        warning &&

                        <Alert variant="warning">

                            {warning}

                        </Alert>

                    }

                    <Form onSubmit={saveExpense}>
                                              <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Expense Title

                                    </Form.Label>

                                    <Form.Control

                                        type="text"

                                        name="title"

                                        value={expense.title}

                                        onChange={handleChange}

                                        placeholder="Enter Expense Title"

                                        required

                                    />

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Amount (₹)

                                    </Form.Label>

                                    <Form.Control

                                        type="number"

                                        name="amount"

                                        value={expense.amount}

                                        onChange={handleChange}

                                        placeholder="Enter Amount"

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

                                        value={expense.category}

                                        onChange={handleChange}

                                        required

                                    >

                                        <option value="">

                                            Select Category

                                        </option>

                                        {

                                            categories.map(category=>(

                                                <option

                                                    key={category.id}

                                                    value={category.name}

                                                >

                                                    {category.name}

                                                </option>

                                            ))

                                        }

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Payment Method

                                    </Form.Label>

                                    <Form.Select

                                        name="paymentMethod"

                                        value={expense.paymentMethod}

                                        onChange={handleChange}

                                    >

                                        <option>

                                            Cash

                                        </option>

                                        <option>

                                            UPI

                                        </option>

                                        <option>

                                            Credit Card

                                        </option>

                                        <option>

                                            Debit Card

                                        </option>

                                        <option>

                                            Net Banking

                                        </option>

                                        <option>

                                            Wallet

                                        </option>

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                        </Row>

                        <Row>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Priority

                                    </Form.Label>

                                    <Form.Select

                                        name="priority"

                                        value={expense.priority}

                                        onChange={handleChange}

                                    >

                                        <option>

                                            Low

                                        </option>

                                        <option>

                                            Medium

                                        </option>

                                        <option>

                                            High

                                        </option>

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>

                                        Expense Date

                                    </Form.Label>

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

                            <Form.Label>

                                Notes

                            </Form.Label>

                            <Form.Control

                                as="textarea"

                                rows={3}

                                name="note"

                                value={expense.note}

                                onChange={handleChange}

                                placeholder="Optional Notes"

                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>

                                Upload Receipt

                            </Form.Label>

                            <Form.Control

                                type="file"

                                accept="image/*,.pdf"

                                onChange={handleReceipt}

                            />

                            <Form.Text>

                                OCR receipt scanning can be added later.

                            </Form.Text>

                        </Form.Group>

                        <Form.Check

                            className="mb-4"

                            type="switch"

                            label="Recurring Expense"

                            name="recurring"

                            checked={expense.recurring}

                            onChange={handleChange}

                        />

                        <Card className="bg-light border-success mb-4">

                            <Card.Body>

                                <h5>

                                    🤖 AI Expense Tips

                                </h5>

                                <ul className="mb-0">

                                    <li>

                                        Try keeping Food expenses below 20% of your monthly income.

                                    </li>

                                    <li>

                                        Large expenses should be planned in advance.

                                    </li>

                                    <li>

                                        If this is a recurring bill, enable the recurring option.

                                    </li>

                                    <li>

                                        Upload receipts to maintain accurate records.

                                    </li>

                                </ul>

                            </Card.Body>

                        </Card>
                                                <Card className="border-primary bg-light mb-4">

                            <Card.Body>

                                <h5>

                                    📊 Expense Preview

                                </h5>

                                <hr />

                                <p>

                                    <strong>Title:</strong>

                                    {" "}

                                    {expense.title || "Not Entered"}

                                </p>

                                <p>

                                    <strong>Amount:</strong>

                                    {" "}

                                    ₹{expense.amount || 0}

                                </p>

                                <p>

                                    <strong>Category:</strong>

                                    {" "}

                                    {expense.category || "Not Selected"}

                                </p>

                                <p>

                                    <strong>Payment:</strong>

                                    {" "}

                                    {expense.paymentMethod}

                                </p>

                                <p>

                                    <strong>Priority:</strong>

                                    {" "}

                                    {expense.priority}

                                </p>

                                <p>

                                    <strong>Date:</strong>

                                    {" "}

                                    {expense.date || "Not Selected"}

                                </p>

                                <p>

                                    <strong>Recurring:</strong>

                                    {" "}

                                    {

                                        expense.recurring

                                        ?

                                        "Yes"

                                        :

                                        "No"

                                    }

                                </p>

                            </Card.Body>

                        </Card>

                        <Row>

                            <Col>

                                <Button

                                    variant="secondary"

                                    onClick={()=>

                                        navigate("/dashboard")

                                    }

                                >

                                    Cancel

                                </Button>

                            </Col>

                            <Col className="text-end">

                                <Button

                                    variant="success"

                                    type="submit"

                                >

                                    💾 Save Expense

                                </Button>

                            </Col>

                        </Row>

                    </Form>

                </Card.Body>

            </Card>

        </Container>

    );

}