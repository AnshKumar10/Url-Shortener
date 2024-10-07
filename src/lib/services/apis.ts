import supabase, { supabaseUrl } from "@/lib/services/db";
import { LoginFormInterface, SignupFormInterface } from "@/lib/interfaces";

export const login = async ({ email, password }: LoginFormInterface) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const signup = async ({
  name,
  email,
  password,
  profilePic,
}: SignupFormInterface) => {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile-pic")
    .upload(fileName, profilePic as File);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
