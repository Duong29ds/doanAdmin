import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
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
import Label from 'src/common/components/Label';
import { IFormPortfolioValuesProps } from 'src/portfolio/\binterface';
import { initialValues, styleButton, styleInput } from '../../constants';

const columns = [
  { name: 'product_image', title: 'Image' },
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

export default function EditPortfolio() {
  const [selectionProduct, setSelectionProduct] = useState([]);
  const methods = useForm<IFormPortfolioValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = methods;

  const handleClickReset = () => {
    methods.reset();
  };

  return (
    <FormProvider methods={methods}>
      <Label sx={{ backgroundColor: '#fff' }}>
        <Typography sx={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Edit Portfolio
        </Typography>
      </Label>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', marginTop: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            width: '50%',
            gap: '20px',
          }}
        >
          <RHFTextField name="supplier_name" label="Name" sx={styleInput} />
          <RHFTextField name="supplier_description" label="Description" sx={styleInput} />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px' }}>
          <Button sx={styleButton}>Edit</Button>
          <Button sx={styleButton} onClick={handleClickReset}>
            Cancel
          </Button>
        </Box>
      </Box>
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SearchState />
          <SelectionState
            selection={selectionProduct}
            onSelectionChange={
              setSelectionProduct as (selection: (string | number)[]) => void
            }
          />
          <Toolbar />
          <IntegratedSelection />
          <IntegratedFiltering />
          <VirtualTable />
          <TableHeaderRow />
          <TableSelection showSelectAll />
          <SearchPanel />
        </Grid>
      </Paper>
    </FormProvider>
  );
}
