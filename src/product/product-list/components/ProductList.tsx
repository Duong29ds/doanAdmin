import React, { ComponentType, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableSelection,
  Toolbar,
  SearchPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SelectionState,
  SearchState,
  IntegratedSelection,
  IntegratedFiltering,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import { Box, Button } from '@mui/material';
import { styleButton } from 'src/product/constants';
import ToolbarCustom from './table/ToolbarCustom';
import { DropzoneRootProps } from 'react-dropzone';

const columns = [
  { name: 'product_image', title: 'Iamge' },
  { name: 'product_name', title: 'Name' },
  { name: 'product_price', title: 'Price' },
  { name: 'product_post_service', title: 'Post Service' },
  { name: 'product_type', title: 'Type' },
];
const rows = [
  {
    product_image: '',
    product_name: 'Key board',
    product_price: '1000000',
    product_post_service: 'no post service',
    product_type: 'Key board',
  },
  {
    product_image: '',
    product_name: 'Key board',
    product_price: '1000000',
    product_post_service: 'no post service',
    product_type: 'Key board',
  },
  {
    product_image: '',
    product_name: 'Key board',
    product_price: '1000000',
    product_post_service: 'no post service',
    product_type: 'Key board',
  },
  {
    product_image: '',
    product_name: 'Key board',
    product_price: '1000000',
    product_post_service: 'no post service',
    product_type: 'Key board',
  },
];

export default function ProductList() {
  const [selection, setSelection] = useState([]);
  const ProductImageColumn = (props: any) => (
    <DataTypeProvider
      for={['product_image']}
      formatterComponent={() => {
        return (
          <img
            src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/297244164_1460435901054767_4188384556076195340_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0debeb&_nc_ohc=13RKnEjg_7EAX-ylFVn&tn=_9eR_sHOcoFXFs8A&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAOyTgMV_lLA_lKDjG4rNKTpFHwKvH0WuQ6yezx3QOLXQ&oe=636256F6"
            srcSet="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/297244164_1460435901054767_4188384556076195340_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0debeb&_nc_ohc=13RKnEjg_7EAX-ylFVn&tn=_9eR_sHOcoFXFs8A&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAOyTgMV_lLA_lKDjG4rNKTpFHwKvH0WuQ6yezx3QOLXQ&oe=636256F6"
            alt="product-image"
            loading="lazy"
          />
        );
      }}
      {...props}
    />
  );
  return (
    <>
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SearchState />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection as (selection: (string | number)[]) => void}
          />
          <Toolbar rootComponent={() => ToolbarCustom({ selection })} />
          <ProductImageColumn />
          <IntegratedSelection />
          <IntegratedFiltering />
          <VirtualTable />
          <TableHeaderRow />
          <TableSelection showSelectAll />
          <SearchPanel />
        </Grid>
      </Paper>
    </>
  );
}
