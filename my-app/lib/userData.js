import { getToken } from "./authenticate";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
    };
}

export async function addToFavourites(id) {
    try {
        const res = await fetch(`${API_URL}/favourites/${id}`, {
            method: "PUT",
            headers: authHeaders()
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            return [];
        }
    } catch (err) {
        console.error("addToFavourites error:", err);
        return [];
    }
}

export async function removeFromFavourites(id) {
    try {
        const res = await fetch(`${API_URL}/favourites/${id}`, {
            method: "DELETE",
            headers: authHeaders()
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            return [];
        }
    } catch (err) {
        console.error("removeFromFavourites error:", err);
        return [];
    }
}

export async function getFavourites() {
    try {
        const res = await fetch(`${API_URL}/favourites`, {
            method: "GET",
            headers: authHeaders()
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            return [];
        }
    } catch (err) {
        console.error("getFavourites error:", err);
        return [];
    }
}
