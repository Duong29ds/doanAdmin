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
import { DropzoneRootProps } from 'react-dropzone';
import ToolbarCustom from './table/ToolbarCustom';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useSelector } from 'react-redux';
import { rowsSelector, setRows } from 'src/portfolio/portfolio.slice';
import { useSnackbar } from 'notistack';
import { dispatch } from 'src/common/redux/store';
import { useDeletePortf } from 'src/portfolio/hook/useDeletePortf';
import { useQuery } from 'react-query';
import { fetchingPortfolios } from 'src/portfolio/service';

const columns = [
  { name: 'name', title: 'Name' },
  { name: 'description', title: 'Description' },
];

export default function PortfolioList() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState([]);

  const rows = useSelector(rowsSelector);

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery(
    ['portfolios'],
    fetchingPortfolios
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

  const { mutate } = useDeletePortf({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) dispatch(setRows(data.data));
  }, [isSuccess, data?.data]);

  const handleDeleteRows = (idlist: number[]) => {
    mutate({
      idlist,
    });
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.general.portfolio.edit(id));
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
              ToolbarCustom({ selection, handleEditRow, handleDeleteRows })
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
