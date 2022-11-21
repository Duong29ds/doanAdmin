export type IFormSupplierValuesProps = {
    name: string;
    description: string;
  };
  
export type IAddSupplier={
  name: string;
  description: string;
}

export type IUpdateSupplier={
  id?:string;
  name: string;
  description: string;
}

export type IDeleteSupplier={
  idlist: number[];
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
