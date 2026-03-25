import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./authServices";

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};
export default ProtectedRoute;