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
import { useFormik } from "formik";
import { signup } from "@/lib/services/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "@/lib/hooks/useFetchHook";
import { useEffect } from "react";
import { LongUrlSearchParams, RouteUrls } from "@/lib/constant";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get(LongUrlSearchParams);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profilePic: undefined,
    },
    validationSchema: signUpFormSchema,
    onSubmit: async () => {
      try {
        await signupUser();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    loading,
    error,
    fn: signupUser,
    data,
  } = useFetch(signup, formik.values);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      navigate(
        `/${RouteUrls.DASHBOARD}?${
          longLink ? `${LongUrlSearchParams}=${longLink}` : ""
        }`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="pl-8"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-message">{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-8"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="pl-8"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePic">Profile Picture</Label>
            <div className="relative">
              <Upload className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="profilePic"
                name="profilePic"
                type="file"
                accept="image/*"
                className="pl-8"
                onChange={(event) => {
                  formik.setFieldValue(
                    "profilePic",
                    event?.currentTarget?.files?.[0]
                  );
                }}
              />
              {formik.touched.profilePic && formik.errors.profilePic && (
                <div className="error-message">{formik.errors.profilePic}</div>
              )}
            </div>
          </div>
          <CardFooter className="p-0">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full"
            >
              {formik.isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
