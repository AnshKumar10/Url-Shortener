export interface SignupFormInterface {
  name: string;
  email: string;
  password: string;
  profilePic?: File;
}

export interface LoginFormInterface {
  email: string;
  password: string;
}
