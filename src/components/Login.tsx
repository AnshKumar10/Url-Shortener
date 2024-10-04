import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginFormSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";

interface LoginFormInterface {
  email: string;
  password: string;
}

const LoginForm = () => {
  const loginUser = (values: LoginFormInterface) => {
    console.log(values);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Welcome back! Please login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginFormSchema}
          onSubmit={loginUser}
        >
          {() => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-8"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-8"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <CardFooter className="flex flex-col p-0 space-y-4">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
