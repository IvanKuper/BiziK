import { FunctionComponent, ReactElement, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getBiz } from "../services/userService";
import { errorMsg } from "../services/feedbackService";

interface ProtectedRouteProps {
  children: ReactElement;
  bizOnly?: boolean;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  children,
  bizOnly = false,
}) => {
  const isLogged = !!sessionStorage.getItem("token");
  const isBiz = isLogged && getBiz();
  const location = useLocation();
  const warnedFor = useRef<string | null>(null);

  useEffect(() => {
    if (warnedFor.current === location.pathname) return;
    warnedFor.current = location.pathname;
    if (!isLogged) {
      errorMsg("Please sign in to continue");
    } else if (bizOnly && !isBiz) {
      errorMsg("This page is for business accounts only");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!isLogged) {
    return <Navigate to="/signin" replace />;
  }

  if (bizOnly && !isBiz) {
    return <Navigate to="/all-cards" replace />;
  }

  return children;
};

export default ProtectedRoute;
