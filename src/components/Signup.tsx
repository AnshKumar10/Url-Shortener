import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Upload } from "lucide-react";
import { signUpFormSchema } from "@/lib/schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";

interface SignupFormInterface {
  name: string;
  email: string;
  password: string;
  profilePic: File | null;
}

const SignupForm = () => {
  const handleSubmit = (values: SignupFormInterface) => {
    console.log("Form values:", values);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            profilePic: null,
          }}
          validationSchema={signUpFormSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="pl-8"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
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
                    placeholder="Create a password"
                    className="pl-8"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePic">Profile Picture (Optional)</Label>
                <div className="relative">
                  <Upload className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profilePic"
                    name="profilePic"
                    type="file"
                    accept="image/*"
                    className="pl-8"
                    onChange={(event) => {
                      setFieldValue(
                        "profilePic",
                        event?.currentTarget?.files?.[0]
                      );
                    }}
                  />
                  <ErrorMessage
                    name="profilePic"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <CardFooter className="p-0">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
