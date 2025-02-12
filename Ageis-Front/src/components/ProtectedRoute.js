import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element, requiredRole }) => {
    
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const userId = userData?.id;
    const userRole = userData?.role;

    if (userId && userRole === requiredRole) {
        return element;
    }
    return <Navigate to="/login" />;
};

export default ProtectedRoute;