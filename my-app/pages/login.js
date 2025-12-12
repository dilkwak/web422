import { useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtom() {
        setFavouritesList(await getFavourites());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setWarning("");

        try {
            const success = await authenticateUser(userName, password);

            if (success) {
                await updateAtom();
                router.push("/");
            } else {
                setWarning("Login failed.");
            }
        } catch (err) {
            setWarning(err.message || "An error occurred during login.");
        }
    }

    return (
        <>
            <PageHeader
                text="Login"
                subtext="Login to access your favourites"
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

                {warning && (
                    <Alert variant="danger">
                        {warning}
                    </Alert>
                )}

                <Button type="submit">Login</Button>
            </Form>
        </>
    );
}
