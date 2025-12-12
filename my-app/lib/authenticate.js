const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
}

export function getToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
        return null;
}

export function removeToken() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
}

export function readToken() {
    const token = getToken();
    if (!token) return null;

    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch (err) {
        console.error("Error decoding token", err);
        return null;
    }
}

export function isAuthenticated() {
    const token = readToken();
    return token !== null;
}

export async function authenticateUser(userName, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
    });

    if (res.status === 200) {
        const data = await res.json();
        setToken(data.token);
        return true;
    } else {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
    }
}

export async function registerUser(userName, password, password2) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, password2 })
    });

    if (res.status === 200) {
        return true;
    } else {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
    }
}

