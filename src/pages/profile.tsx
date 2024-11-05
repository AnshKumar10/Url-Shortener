import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, Pencil, Upload, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UrlState } from "@/lib/context/urlContext";
import { updateUser, uploadProfilePic } from "@/lib/services/user";
import toast from "react-hot-toast";
import { User as UserInterface } from "@supabase/supabase-js";

const Profile = () => {
  const { user: userProfile } = UrlState();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInterface>(userProfile as UserInterface);
  const [isProfilePicUploading, setIsProfilePicUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: user.phone || "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .optional(),
    }),
    onSubmit: async () => {
      setIsLoading(true);
      try {
        await updateUser({
          data: user.user_metadata,
        });
        toast.success("Profile updated successfully");
      } catch {
        toast.error("Error updating profile");
      } finally {
        setIsLoading(false);
        setIsEditing(false);
      }
    },
  });

  const handleProfilePicUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const profilePic = event.target.files?.[0];
    if (profilePic) {
      setIsProfilePicUploading(true);
      try {
        const uploadedProfilePic = await uploadProfilePic(
          user?.user_metadata?.name,
          profilePic
        );
        setUser((prevState) => ({
          ...prevState,
          user_metadata: {
            ...prevState.user_metadata,
            profile_pic: uploadedProfilePic,
          },
        }));
        toast.success("Profile picture uploaded successfully");
      } catch {
        toast.error("Error uploading profile picture");
      } finally {
        setIsProfilePicUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    alt={user?.user_metadata?.name}
                  />
                  <AvatarFallback>
                    <User className="w-12 h-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                  </Label>
                )}
                {isProfilePicUploading && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-background rounded">
                    <Loader className="animate-spin w-6 h-6 text-primary" />
                    <span className="ml-2 text-sm">Uploading...</span>
                  </div>
                )}
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <CardTitle className="text-2xl md:text-3xl">
                  {user?.user_metadata?.name}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-2"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Personal Details Section */}
            <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    disabled
                    defaultValue={user?.user_metadata?.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    disabled
                    defaultValue={user?.user_metadata?.email}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    disabled={!isEditing}
                    {...formik.getFieldProps("phone")}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div> */}
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}

              {/* Account Settings Section */}
              <h2 className="text-lg font-semibold mt-6 mb-4">
                Account Settings
              </h2>
              <Alert className="mt-6">
                <User className="h-4 w-4" />
                <AlertTitle>Account Information</AlertTitle>
                <AlertDescription>
                  Member since{" "}
                  {new Date(user?.created_at || "").toLocaleDateString()}
                </AlertDescription>
              </Alert>
            </form>

            {/* Additional Actions */}
            {/* <div className="flex flex-col space-y-2 mt-6">
              <Button type="button" variant="outline">
                Forgot Password
              </Button>
              <Button type="button" variant="outline" className="text-red-600">
                Delete Account
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
