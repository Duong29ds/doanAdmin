import { CustomFile } from "src/common/components/upload";

export type IFormProfuctValuesProps = {
    product_name: string;
    product_description: string;
    product_price: number;
    product_portfolio:string;
    product_date_import?: Date;
    product_post_service?: string;
    product_image: CustomFile | string | null;
  };
  