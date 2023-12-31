import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { MapRoutes } from "./CreateRoute"

export const AllRoutes = () => {
    return (
        <Routes>
            {MapRoutes?.map((item, index) => (
                <Route key={index} path={item?.path} element={<item.privateRoutes child={<item.component />} />} />
            ))}
        </Routes>
    )
}

// element={<item.privateRoutes child={item?.component} />} />
