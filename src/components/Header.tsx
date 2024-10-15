import { Button } from "@/components/ui/button";
import { UrlState } from "@/lib/context/urlContext";
import { RouteUrls } from "@/lib/constant";
import useFetch from "@/lib/hooks/useFetchHook";
import { logout } from "@/lib/services/core";
import { LinkIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();

  const navigateToHomepage = () => navigate(RouteUrls.ROOT);

  const navigateToLogin = () => navigate(RouteUrls.AUTH);

  const navigateToSignup = () => navigate(`${RouteUrls.AUTH}?tab=signup`);

  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <header className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={navigateToHomepage}
          >
            SnipUrl
          </h1>
          <nav className="py-4 flex items-center">
            <div className="flex gap-4">
              {!user ? (
                <div>
                  <Button onClick={navigateToLogin} variant="ghost">
                    Login
                  </Button>
                  <Button onClick={navigateToSignup}>Sign Up</Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                    <Avatar>
                      <AvatarImage src={user?.user_metadata?.profile_pic} />
                      <AvatarFallback>
                        {user?.user_metadata?.name}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {user?.user_metadata?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to={RouteUrls.DASHBOARD} className="flex">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        My Links
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        fnLogout().then(() => {
                          fetchUser();
                          navigate(RouteUrls.AUTH);
                        });
                      }}
                      className="text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            {loading && (
              <div className="ml-4">
                <BarLoader width={"100%"} color="#36d7b7" />
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
