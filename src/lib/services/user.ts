import supabase, { SUPABASE_URL } from "@/lib/services/db";
import { UserAttributes } from "@supabase/supabase-js";

export const getCurrentUser = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
};

export const uploadProfilePic = async (name: string, profilePic: File) => {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile-pic")
    .upload(fileName, profilePic);

  if (storageError) throw new Error(storageError.message);

  return `${SUPABASE_URL}/storage/v1/object/public/profile-pic/${fileName}`;
};

export const updateUser = async (updatedUser: UserAttributes) => {
  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) throw new Error(error.message);

  return data;
};
