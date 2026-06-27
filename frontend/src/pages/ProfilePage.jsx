import { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Badge
} from "react-bootstrap";

import api from "../services/api";

export default function ProfilePage() {

    const [profile, setProfile] = useState({

        fullName: "",

        email: "",

        phone: "",

        occupation: "",

        monthlyIncome: 0,

        monthlyBudget: 0,

        savingsGoal: 0,

        currency: "₹",

        theme: "Light",

        profileImage: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await api.get("/profile/1");

            setProfile(res.data);

        }

        catch {

            console.log("Profile not created");

        }

    };

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            await api.put("/profile/1", profile);

            alert("Profile Updated");

        }

        catch {

            alert("Unable to Update");

        }

    };

    const financeScore = (() => {

        let score = 100;

        if(profile.monthlyBudget===0)

            score-=20;

        if(profile.savingsGoal===0)

            score-=20;

        return score;

    })();

    return(

        <Container className="mt-5">

            <Row>

                <Col md={4}>

                    <Card className="shadow">

                        <Card.Body className="text-center">

                            <img

                                src={

                                    profile.profileImage ||

                                    "https://via.placeholder.com/150"

                                }

                                alt="Profile"

                                width="150"

                                height="150"

                                className="rounded-circle mb-3"

                            />

                            <h3>

                                {profile.fullName || "Your Name"}

                            </h3>

                            <Badge bg="primary">

                                {profile.occupation || "Occupation"}

                            </Badge>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={8}>

                    <Card className="shadow">

                        <Card.Body>

                            <h3>

                                👤 Personal Information

                            </h3>

                            <hr/>

                            <Row>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Full Name

                                        </Form.Label>

                                        <Form.Control

                                            name="fullName"

                                            value={profile.fullName}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Email

                                        </Form.Label>

                                        <Form.Control

                                            name="email"

                                            value={profile.email}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                            </Row>

                            <Row>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Phone

                                        </Form.Label>

                                        <Form.Control

                                            name="phone"

                                            value={profile.phone}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Occupation

                                        </Form.Label>

                                        <Form.Control

                                            name="occupation"

                                            value={profile.occupation}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                            </Row>
                                                        <hr />

                            <h3>

                                💰 Finance Settings

                            </h3>

                            <Row>

                                <Col md={4}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Monthly Income

                                        </Form.Label>

                                        <Form.Control

                                            type="number"

                                            name="monthlyIncome"

                                            value={profile.monthlyIncome}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={4}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Monthly Budget

                                        </Form.Label>

                                        <Form.Control

                                            type="number"

                                            name="monthlyBudget"

                                            value={profile.monthlyBudget}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                                <Col md={4}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Savings Goal

                                        </Form.Label>

                                        <Form.Control

                                            type="number"

                                            name="savingsGoal"

                                            value={profile.savingsGoal}

                                            onChange={handleChange}

                                        />

                                    </Form.Group>

                                </Col>

                            </Row>

                            <Row>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Currency

                                        </Form.Label>

                                        <Form.Select

                                            name="currency"

                                            value={profile.currency}

                                            onChange={handleChange}

                                        >

                                            <option value="₹">

                                                ₹ INR

                                            </option>

                                            <option value="$">

                                                $ USD

                                            </option>

                                            <option value="€">

                                                € EURO

                                            </option>

                                            <option value="£">

                                                £ GBP

                                            </option>

                                        </Form.Select>

                                    </Form.Group>

                                </Col>

                                <Col md={6}>

                                    <Form.Group className="mb-3">

                                        <Form.Label>

                                            Theme

                                        </Form.Label>

                                        <Form.Select

                                            name="theme"

                                            value={profile.theme}

                                            onChange={handleChange}

                                        >

                                            <option>

                                                Light

                                            </option>

                                            <option>

                                                Dark

                                            </option>

                                        </Form.Select>

                                    </Form.Group>

                                </Col>

                            </Row>

                            <Button

                                variant="success"

                                className="w-100"

                                onClick={saveProfile}

                            >

                                Save Profile

                            </Button>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row className="mt-4">

                <Col md={6}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                🤖 AI Finance Coach

                            </h4>

                            <hr />

                            <p>

                                💰 Monthly Income :
                                <strong> {profile.currency}{profile.monthlyIncome}</strong>

                            </p>

                            <p>

                                🎯 Budget :
                                <strong> {profile.currency}{profile.monthlyBudget}</strong>

                            </p>

                            <p>

                                💵 Suggested Savings :
                                <strong>

                                    {profile.currency}

                                    {Math.round(profile.monthlyIncome * 0.20)}

                                </strong>

                            </p>

                            <p>

                                📈 Suggested Investments :
                                <strong>

                                    {profile.currency}

                                    {Math.round(profile.monthlyIncome * 0.10)}

                                </strong>

                            </p>

                            <p>

                                🎉 Entertainment Budget :
                                <strong>

                                    {profile.currency}

                                    {Math.round(profile.monthlyIncome * 0.05)}

                                </strong>

                            </p>

                            <p>

                                🚨 Emergency Fund :
                                <strong>

                                    {profile.currency}

                                    {Math.round(profile.monthlyIncome * 0.10)}

                                </strong>

                            </p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col md={6}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                📊 Finance Score

                            </h4>

                            <hr />

                            <h1 className="text-success">

                                {financeScore}/100

                            </h1>

                            <p>

                                Keep your budget updated and continue saving to improve your financial health.

                            </p>

                            <hr />

                            <h5>

                                🏆 Achievements

                            </h5>

                            <ul>

                                <li>🎯 Budget Planner</li>

                                <li>💰 Savings Goal Tracker</li>

                                <li>📊 Financial Analytics User</li>

                                <li>🤖 AI Finance Planner Enabled</li>

                            </ul>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>

    );

}