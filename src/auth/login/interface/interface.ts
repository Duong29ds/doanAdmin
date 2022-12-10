export type IFormLoginValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export type IFormSignUpValuesProps = {
  name: string;
  phonenumber: string;
  address: string;
  email: string;
  password: string;
  confirm_password: string;
  remember: boolean;
  afterSubmit?: string;
};
