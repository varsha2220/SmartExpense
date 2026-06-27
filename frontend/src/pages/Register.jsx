import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import api from "../services/api";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            await api.post("/auth/register", {
                fullName: form.fullName,
                email: form.email,
                password: form.password
            });

            alert("Registration Successful!");
            navigate("/login");

        } catch (err) {

            console.log(err);
            setError("Registration Failed.");

        }

    };

    return (

        <Container className="mt-5">

            <Card className="shadow-lg p-4">

                <h2 className="text-center mb-4">
                    📝 Register
                </h2>

                {error &&

                    <Alert variant="danger">
                        {error}
                    </Alert>

                }

                <Form onSubmit={handleRegister}>

                    <Form.Group className="mb-3">

                        <Form.Label>Full Name</Form.Label>

                        <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                    </Form.Group>

                    <Form.Group className="mb-4">

                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                    </Form.Group>

                    <Button
                        type="submit"
                        variant="success"
                        className="w-100"
                    >
                        Register
                    </Button>

                </Form>

                <div className="text-center mt-3">

                    Already have an account?

                    <br />

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </Card>

        </Container>

    );

}