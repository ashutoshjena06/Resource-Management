import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute=({ children }) =>{
  console.log(children);
  const [cookies] = useCookies(["Email"]);
  const isAuthenticated = cookies.Email !== undefined;

  return isAuthenticated ? children : <Navigate to="/api/login" />;
}