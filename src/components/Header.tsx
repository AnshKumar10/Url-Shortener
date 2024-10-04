import { Button } from "@/components/ui/button";
import { RouteUrls } from "@/lib/constant";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateToHomepage = () => navigate(RouteUrls.ROOT);

  const navigateToLogin = () => navigate(RouteUrls.AUTH);

  return (
    <>
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={navigateToHomepage}
          >
            Trimrr
          </h1>
          <nav>
            <Button onClick={navigateToLogin} variant="ghost">
              Login
            </Button>
            <Button>Sign Up</Button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
