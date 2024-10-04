import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  
  return (
    <>
      <div className="mt-10 flex flex-col items-center gap-10">
        <h1 className="text-3xl font-extrabold">
          {searchParams.get("create") ? "Let's login first.." : "Join us now"}
        </h1>
        <Tabs defaultValue="login" className="w-[400px]">
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
