export const initialValues={
    product_name: "",
    product_description: "",
    product_price_import: 0,
    product_price_show: 0,
    product_date_import:new Date('2022-02-02'),
    product_post_service: "",
    product_image: "",
}

export const styleInput={width:'100%'}

export const styleButton={fontSize:'20px', backgroundColor:'#FDF0E0'}

export const TABLE_HEAD = [
    { id: 'thumbnail', label: 'Image', align: 'left' },
    { id: 'title', label: 'Title', align: 'left' },
  ];