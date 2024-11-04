import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { urlSchema } from "@/lib/schemas";
import { useNavigate } from "react-router-dom";
import { LongUrlSearchParams, RouteUrls } from "@/lib/constant";
import { UrlState } from "@/lib/context/urlContext";

const URLShortenerForm = () => {
  const navigate = useNavigate();

  const { user } = UrlState();

  const handleShortenUrl = (url: string) => {
    navigate(
      `${
        user ? RouteUrls.DASHBOARD : RouteUrls.AUTH
      }?${LongUrlSearchParams}=${url}`
    );
  };

  return (
    <Formik
      initialValues={{
        url: "",
      }}
      validationSchema={urlSchema}
      onSubmit={(values) => {
        handleShortenUrl(values.url);
      }}
    >
      {() => (
        <Form className="w-full mx-auto p-4 sm:p-6">
          <div className="space-y-4">
            <div className="relative flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex-grow">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Field
                  as={Input}
                  id="url"
                  name="url"
                  type="text"
                  placeholder="Enter your long URL"
                  className="pl-10 pr-2 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="url"
                  component="div"
                  className="text-start error-message"
                />
              </div>
              <Button
                type="submit"
                className="h-10 px-4 sm:px-8 mt-2 w-full sm:w-auto"
                size="lg"
              >
                Shorten!
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default URLShortenerForm;
