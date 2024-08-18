/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

interface MyRouteProps {
    children: ReactNode | (() => ReactNode);
    isClosed?: boolean;
    requiredPermission: string;
}

interface LocationState {
    prevPath: string;
}

export interface Decoded {
    idUser: string;
    nomeDoUsuario: string;
    permission: string;
    exp: number;
    iat: number;
}

const PrivateRoute: React.FC<MyRouteProps> = ({ children, isClosed = false, requiredPermission }) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const token = useSelector((state: any) => state.auth.token);

    if (token === null) {
        return <Navigate to="/unauthorized" />;
    }

    const decoded: Decoded = jwtDecode(token);

    console.log(decoded);

    const userPermission = decoded.permission;

    const location = useLocation();

    if (isClosed && !isLoggedIn) {
        return <Navigate to="/redirect" state={{ prevPath: location.pathname } as LocationState} />;
    }

    if (requiredPermission && userPermission !== requiredPermission) {
        return <Navigate to="/unauthorized" state={{ prevPath: location.pathname } as LocationState} />;
    }

    const renderedChildren = typeof children === 'function' ? (children as () => ReactNode)() : children;

    return isLoggedIn ? <>{renderedChildren}</> : <Navigate to="/login" />;
};
export default PrivateRoute;