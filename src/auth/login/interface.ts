export type IAuth = {
  email: string;
  password: string;
};

export type ISignUp = {
  name: string;
  phone_number: string;
  address: string;
  email: string;
  password: string;
};

export type ILoginCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
