import { useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setWarning("");

        try {
            await registerUser(userName, password, password2);
            router.push("/login");
        } catch (err) {
            setWarning(err.message || "An error occurred during registration.");
        }
    }

    return (
        <>
            <PageHeader
                text="Register"
                subtext="Register for an account"
            />

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </Form.Group>

                {warning && (
                    <Alert variant="danger">
                        {warning}
                    </Alert>
                )}

                <Button type="submit">Register</Button>
            </Form>
        </>
    );
}
