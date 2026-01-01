import {jwtDecode} from "jwt-decode";
import {Navigate, Outlet} from "react-router-dom";

const RequireAuth = () => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const RequireRole = ({allowedRoles, redirectPath = "/dashboard"}) => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const {ROLE} = jwtDecode(token);

    if (!allowedRoles.includes(String(ROLE))) {
      return <Navigate to={redirectPath} replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const RequireNoAuth = () => {
  const token = localStorage.getItem("access-token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export {RequireAuth, RequireRole, RequireNoAuth};
