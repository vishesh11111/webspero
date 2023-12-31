import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

export const PrivateRoutes = ({ child }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            return child; // Render the child component if the user is authenticated
        } else {
            navigate("/signin")
            // return <Navigate to="/signin" replace={true}/>; // Redirect to the sign-in page
        }
    }, [])

};
