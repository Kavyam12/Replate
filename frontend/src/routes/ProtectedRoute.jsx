import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import springconfig from "../api/api";

export default function ProtectedRoute() {

    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        springconfig.get("/auth/me")
            .then(() => setAuthenticated(true))
            .catch(() => setAuthenticated(false));
    }, []);

    if (authenticated === null) return <div>Checking authentication...</div>;

    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}