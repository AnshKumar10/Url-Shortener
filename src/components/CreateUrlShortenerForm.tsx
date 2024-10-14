import { useState } from "react";
import { useFormik } from "formik";
import { CreateUrlShortenerFormSchema } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { createUrl } from "@/lib/services/urls";
import useFetch from "@/lib/hooks/useFetchHook";
import { UrlState } from "@/lib/context/urlContext";

const CreateUrlShortenerForm = () => {
  const [open, setOpen] = useState(false);

  const { user } = UrlState();

  const formik = useFormik({
    initialValues: {
      title: "",
      longUrl: "",
      customUrl: "",
    },
    validationSchema: CreateUrlShortenerFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      setOpen(false);
      handleCreateUrl();
      formik.resetForm();
    },
  });

  const { fn: handleCreateUrl } = useFetch(createUrl, {
    ...formik.values,
    userId: user?.id as string,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Shorten URL</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Link className="h-6 w-6" />
            Shorten Your URL
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter a memorable title for your link"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.errors.title && formik.touched.title && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="longUrl">Long URL</Label>
            <Input
              id="longUrl"
              name="longUrl"
              placeholder="https://example.com/very/long/url/to/shorten"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.longUrl}
            />
            {formik.errors.longUrl && formik.touched.longUrl && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.longUrl}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="customUrl">Custom URL (Optional)</Label>
            <Input
              id="customUrl"
              name="customUrl"
              placeholder="my-custom-url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.customUrl}
            />
            {formik.errors.customUrl && formik.touched.customUrl && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.customUrl}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Shortening..." : "Shorten URL"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUrlShortenerForm;
