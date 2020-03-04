export interface IUser {
  user_email: string;
  password: string;
  user_role?: string;
  confirmed?: boolean;
  profile_pic?: string;
  name?: string;
  lastname?: string;
  cellphone?: string;
  worksite?: string;
  enterprise?: string;
  country?: string;
  city?: string;
  book_collection?: IBook[];
}

export interface IBook {
  title: string;
  description: string;
  author: string;
  price?: number;
  extension?: string;
  publisher?: string;
  publisherYear?: any;
  writingYear?: any;
  categories?: string[];
  filename?: string;
  userUploaderId: string;
  timestamp?: any;
}
