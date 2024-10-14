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

export interface CreateUrlInterface {
  title: string;
  longUrl: string;
  customUrl: string;
  userId: string;
}

export interface UrlsDbInterface {
  id: string;
  created_at: string;
  original_url: string;
  short_url: string;
  custom_url: string | null;
  user_id: string;
  title: string;
  qr_code: string | null;
}
