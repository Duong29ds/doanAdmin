import { CustomFile } from 'src/common/components/upload';

export type IFormProfuctValuesProps = {
  id?: string;
  name: string;
  description: string;
  total: number;
  price: number;
  portfolio: string;
  supplier: string;
  import_date?: Date;
  post_service?: string;
  images: (CustomFile | string | null)[];
};

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IUpdateProduct = {
  id?: string;
  name: string;
  description: string;
  price: number;
  portfolio: string;
  supplier: string;
  import_date?: Date;
  post_service?: string;
  images: (CustomFile | string | null)[];
};

export type IAddProduct = {
  name: string;
  description: string;
  total: number;
  price: number;
  portfolio: string;
  supplier: string;
  idSup: number;
  idListPortfolio: number[];
  import_date?: Date;
  post_service?: string;
  images: number[];
};

export type IOptions = {
  value: string | number;
  label: string;
};
