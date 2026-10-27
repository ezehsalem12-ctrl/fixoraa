import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../hooks/CurrentUser";
import type { User } from "../services/authService";

interface ProtectedRouteProps {
  allowedRoles?: User["role"][];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { data: user, isPending, isError } = useCurrentUser();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-600">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboard = user.role === "customer" ? "/customer" : "/provider";

    return <Navigate to={dashboard} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
