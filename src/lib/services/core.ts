import supabase from "@/lib/services/db";
import { LoginFormInterface, SignupFormInterface } from "@/lib/interfaces";
import { uploadProfilePic } from "./user";

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
  let profile_pic: string | null = null;

  if (profilePic) profile_pic = await uploadProfilePic(name, profilePic);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
