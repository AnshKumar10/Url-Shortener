import { Button } from "@/components/ui/button";
import { UrlState } from "@/lib/context/urlContext";
import { RouteUrls } from "@/lib/constant";
import useFetch from "@/lib/hooks/useFetchHook";
import { logout } from "@/lib/services/core";
import { LinkIcon, LogOut, User } from "lucide-react";
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
  const { user, fetchUser } = UrlState();
  const { loading, fn: logoutUser } = useFetch(logout);

  type NavItemType = {
    label: string;
    onClick: () => void;
    variant:
      | "ghost"
      | "default"
      | "link"
      | "destructive"
      | "outline"
      | "secondary";
  };

  const navItems: NavItemType[] = [
    {
      label: "Login",
      onClick: () => navigate(RouteUrls.AUTH),
      variant: "ghost",
    },
    {
      label: "Sign Up",
      onClick: () => navigate(`${RouteUrls.AUTH}?tab=signup`),
      variant: "default",
    },
  ];

  const userMenuItems = [
    {
      label: "My Links",
      icon: <LinkIcon className="mr-2 h-4 w-4" />,
      to: RouteUrls.DASHBOARD,
    },
    {
      label: "My Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      to: RouteUrls.SETTING_PROFILE,
    },
    {
      label: "Logout",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      action: async () => {
        await logoutUser();
        fetchUser();
        navigate(RouteUrls.AUTH);
      },
      className: "text-red-400",
    },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-8 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate(RouteUrls.ROOT)}
        >
          SnipUrl
        </h1>
        <nav className="py-4 flex items-center">
          <div className="flex gap-4">
            {!user ? (
              navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={item.onClick}
                  variant={item.variant}
                >
                  {item.label}
                </Button>
              ))
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.user_metadata?.profile_pic} />
                    <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.user_metadata?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={item.action}
                      className={item.className}
                    >
                      {item.icon}
                      {item.to ? (
                        <Link to={item.to} className="flex">
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                    </DropdownMenuItem>
                  ))}
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
  );
};

export default Header;
