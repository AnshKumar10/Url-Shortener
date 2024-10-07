import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { urlSchema } from "@/lib/schemas";

interface URLShortenerFormPropsInterface {
  shortenUrl: (url: string) => void;
}

const URLShortenerForm: React.FC<URLShortenerFormPropsInterface> = ({ shortenUrl }) => {
  return (
    <Formik
      initialValues={{
        url: "",
      }}
      validationSchema={urlSchema}
      onSubmit={(values) => {
        shortenUrl(values.url);
      }}
    >
      {() => (
        <Form className="w-full max-w-2xl mx-auto">
          <div className="space-y-2">
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Field
                  as={Input}
                  id="url"
                  name="url"
                  type="text"
                  placeholder="Enter your long Url"
                  className="pl-8 pr-2 py-2 w-full"
                />
              </div>
              <Button type="submit" className="h-10 px-8" size="lg">
                Shorten!
              </Button>
            </div>
            <ErrorMessage name="url" component="div" className="text-start error-message" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default URLShortenerForm;
