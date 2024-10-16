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
import { useFormik } from "formik";
import { loginFormSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/services/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/lib/context/urlContext";
import { LongUrlSearchParams, RouteUrls } from "@/lib/constant";
import { useEffect } from "react";
import useFetch from "@/lib/hooks/useFetchHook";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get(LongUrlSearchParams);
  const { fetchUser } = UrlState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginFormSchema,
    onSubmit: async () => {
      await loginUser();
    },
  });

  const {
    error,
    loading,
    fn: loginUser,
    data,
  } = useFetch(login, formik.values);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      fetchUser();
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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Welcome back! Please login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
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
          <CardFooter className="flex flex-col p-0 space-y-4">
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              className="w-full"
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
