import React, { ComponentType, useEffect, useState } from 'react';
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
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { dispatch } from 'src/common/redux/store';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { fetchingProducts } from 'src/product/service';
import { rowsSelector, setRows } from 'src/product/product.slide';
import { useSelector } from 'react-redux';
import { useDeleteProd } from 'src/product/hook/useDeleteProd';

const columns = [
  { name: 'id', title: 'Id' },
  { name: 'name', title: 'Name' },
  { name: 'description', title: 'Description' },
  { name: 'total', title: 'Total' },
  { name: 'price', title: 'Price' },
  { name: 'post_service', title: 'Post Service' },
];

export default function ProductList() {
  const [selection, setSelection] = useState([]);
  const navigate = useNavigate();
  const rows = useSelector(rowsSelector);

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery(
    ['products'],
    fetchingProducts
  );

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Xoá nhà cung cấp thành công!', {
      variant: 'success',
      autoHideDuration: 1000,
    });
    refetch();
    setSelection([]);
  };
  const onError = () => {
    enqueueSnackbar('Xoá thất bại', {
      variant: 'error',
    });
  };

  const { mutate } = useDeleteProd({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRows(data.data));
    }
  }, [isSuccess, data?.data]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.product.edit(id));
  };

  const handleDeleteRows = (idlist: number[]) => {
    mutate({
      idlist,
    });
  };
  const ProductImageColumn = (props: any) => (
    <DataTypeProvider
      for={['image']}
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
          <Toolbar
            rootComponent={() =>
              ToolbarCustom({ selection, handleEditRow, handleDeleteRows })
            }
          />
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
