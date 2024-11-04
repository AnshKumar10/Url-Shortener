import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Auth = () => {
  const TABS = {
    LOGIN: "login",
    SIGNUP: "signup",
  };

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(TABS.LOGIN);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === TABS.SIGNUP) {
      setActiveTab(TABS.SIGNUP);
    } else {
      setActiveTab(TABS.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <div className="mt-10 px-4 flex flex-col items-center gap-10">
        <h1 className="text-3xl font-extrabold">
          {searchParams.get("create") ? "Let's login first.." : "Join us now"}
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Auth;
