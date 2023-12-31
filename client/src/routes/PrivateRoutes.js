import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

export const PrivateRoutes = ({ child }) => {
    const user = localStorage.getItem("token");
    const navigate = useNavigate();

    if (user) {
        return child;
    }

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
    }, [user])

};
