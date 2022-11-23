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
} from '@devexpress/dx-react-grid';
import ToolbarCustom from './table/ToolbarCustom';
import { dispatch } from 'src/common/redux/store';
import { useQuery } from 'react-query';
import { fetchingSuppliers } from 'src/supply/service';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { rowsSelector, setRows } from 'src/supply/supplier.slice';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useDeleteSup } from 'src/supply/hook/useDeleteSup';
import { fetchingOrders } from 'src/order/service';

const columns = [
  { name: 'name', title: 'Name' },
  { name: 'description', title: 'Description' },
];

export default function OrderList() {
  const [selection, setSelection] = useState([]);
  const rows = useSelector(rowsSelector);
  const navigate = useNavigate();

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery(
    ['orders'],
    fetchingOrders
  );

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Xoá đơn hàng thành công!', {
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

  const { mutate } = useDeleteSup({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) dispatch(setRows(data.data));
  }, [isSuccess, data?.data]);

  console.log(data,'data')

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.supplier.edit(id));
  };

  const handleDeleteRows = (idlist: number[]) => {
    mutate({
      idlist,
    });
  };

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
              ToolbarCustom({
                selection,
                handleEditRow,
                handleDeleteRows,
              })
            }
          />
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
