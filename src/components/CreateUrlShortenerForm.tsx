import { useState } from "react";
import { useFormik } from "formik";
import { CreateUrlShortenerFormSchema } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, Globe, Scissors } from "lucide-react";
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
        <Button variant="outline" className="flex items-center gap-2">
          <Scissors className="h-4 w-4" />
          Shorten URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Link className="h-6 w-6 text-primary" />
            Shorten Your URL
          </DialogTitle>
          <DialogClose className="absolute right-0 top-0" />
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <div className="relative">
              <Input
                id="title"
                name="title"
                placeholder="Enter a memorable title for your link"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className="pl-10"
              />
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {formik.errors.title && formik.touched.title && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="longUrl" className="text-sm font-medium">
              Long URL
            </Label>
            <div className="relative">
              <Input
                id="longUrl"
                name="longUrl"
                placeholder="https://example.com/very/long/url/to/shorten"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.longUrl}
                className="pl-10"
              />
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {formik.errors.longUrl && formik.touched.longUrl && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.longUrl}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="customUrl" className="text-sm font-medium">
              Custom URL (Optional)
            </Label>
            <div className="relative">
              <Input
                id="customUrl"
                name="customUrl"
                placeholder="my-custom-url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customUrl}
                className="pl-10"
              />
              <Scissors className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
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
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Shortening...
              </div>
            ) : (
              <>
                <Scissors className="mr-2 h-4 w-4" />
                Shorten URL
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUrlShortenerForm;
