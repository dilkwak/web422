import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard(props) {
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const PUBLIC_PATHS = ["/login", "/register", "/about"];

    async function updateAtom() {
        setFavouritesList(await getFavourites());
    }

    useEffect(() => {
        updateAtom();

        const token = getToken();
        const currentPath = router.pathname;

        if (!PUBLIC_PATHS.includes(currentPath) && !token) {
            router.push("/login");
        }

    }, [router.pathname]);

    return <>{props.children}</>;
}
