import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const loading = useSelector((state) => state.admin.loading);
  const isAdminAuthenticated = useSelector(
    (state) => state.admin.isAdminAuthenticated
  );
  if (loading === false && isAdminAuthenticated === false) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default ProtectedAdminRoute;
