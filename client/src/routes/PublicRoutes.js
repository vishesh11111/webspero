import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const PublicRoutes = ({ child }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/signin");
        }
    }, [user, navigate]);

    return user ? null : child; // Render the child component only if the user is not present
};
