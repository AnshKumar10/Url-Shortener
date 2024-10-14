import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { UrlState } from "@/lib/context/urlContext";
import { BarLoader } from "react-spinners";
import { RouteUrls } from "@/lib/constant";

const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate(RouteUrls.AUTH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width="100%" color="#36d7b7" />;

  if (isAuthenticated) return children;
};

export default RequireAuth;
