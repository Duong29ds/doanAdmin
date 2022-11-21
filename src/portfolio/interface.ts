import { IFormProfuctValuesProps } from "src/product/interface";

export type IFormPortfolioValuesProps = {
    id?:string,
    name: string;
    description: string;
    products:Array<IFormProfuctValuesProps>;
  };
  

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IUpdatePortfolio={
  id?:string;
  name?: string;
  description?: string;
  idListProduct?: number[];
  products?:Array<IFormProfuctValuesProps>
}