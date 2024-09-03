import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Authorities } from "../types";

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: Authorities[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const { getUser } = useAuth();

  const user = getUser()?.user.guest;
  const authority = user?.authorities[0]?.authority as Authorities;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (authority)
    if (roles && !roles.includes(authority)) {
      return <Navigate to="/" />;
    }

  return element;
};

export default PrivateRoute;
