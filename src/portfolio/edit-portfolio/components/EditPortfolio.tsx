import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useUpdatePortf } from 'src/portfolio/hook/useUpdatePortf';
import { fetchingPortfolioById } from 'src/portfolio/service';
import { useNavigate, useParams } from 'react-router-dom';
import ToolbarCustom from 'src/portfolio/portfolio-list/components/table/ToolbarCustom';
import { handleGetIDList } from 'src/supply/utils';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

const columns = [
  { name: 'name', title: 'Name' },
  { name: 'description', title: 'Description' },
  { name: 'total', title: 'Total' },
  { name: 'price', title: 'Price' },
  { name: 'post_service', title: 'Post Service' },
  { name: 'import_date', title: 'Import Date' },
];

export default function EditPortfolio() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const params = useParams();
  const id = params?.id;
  const methods = useForm<IFormPortfolioValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
    getValues,
  } = methods;

  const { data, error, isError, refetch, isSuccess } = useQuery([`portfolio/${id}`], () =>
    fetchingPortfolioById(id)
  );

  console.log(data, 'data');

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Sửa danh mục sản phẩm thành công!', {
      variant: 'success',
      autoHideDuration: 1000,
    });
    refetch();
    setSelection([]);
  };
  const onError = () => {
    enqueueSnackbar('Sửa thất bại', {
      variant: 'error',
    });
    methods.reset();
  };

  const { mutate } = useUpdatePortf({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) {
      methods.reset(data.data);
      setRows(data.data.products);
    }
  }, [isSuccess, data?.data]);

  const handleSubmitEdit = () => {
    const idListProduct = rows
      // .filter((item) => !selection.includes(item.id))
      .map((item) => item.id);
    const dataSubmitEdit = { ...getValues(), idListProduct: idListProduct };
    mutate(dataSubmitEdit);
  };

  const handleClickReset = () => {
    methods.reset();
  };

  const handleDeleteRows = (idlist: number[]) => {
    const idListDelete = handleGetIDList(rows, selection);
    const idListProduct = rows
      .filter((item) => !idListDelete.includes(item.id))
      .map((item) => item.id);
    mutate({ id, idListProduct });
  };

  const handleCancel = () => {
    navigate(PATH_DASHBOARD.general.portfolio.root);
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
          <RHFTextField name="name" label="Name" sx={styleInput} />
          <RHFTextField name="description" label="Description" sx={styleInput} />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px' }}>
          <Button sx={styleButton} onClick={handleSubmitEdit}>
            Edit
          </Button>
          <Button sx={styleButton} onClick={handleClickReset}>
            Cancel
          </Button>
        </Box>
      </Box>
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SearchState />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection as (selection: (string | number)[]) => void}
          />
          <Toolbar rootComponent={() => ToolbarCustom({ selection, handleDeleteRows })} />
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
