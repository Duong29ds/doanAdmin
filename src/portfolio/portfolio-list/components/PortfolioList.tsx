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
import { DropzoneRootProps } from 'react-dropzone';
import ToolbarCustom from './table/ToolbarCustom';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

const columns = [
  { name: 'supplier_name', title: 'Name' },
  { name: 'supplier_description', title: 'Description' },
];
const rows = [
  {
    id: 0,
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
  {
    id: 1,
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
  {
    id: 2,
    supplier_name: 'Mouse',
    supplier_description: '1000000',
  },
  {
    id: 3,
    supplier_name: 'Monitor',
    supplier_description: '1000000',
  },
  {
    id: 4,
    supplier_name: 'Tree',
    supplier_description: '1000000',
  },
];

export default function PortfolioList() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState([]);

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
          <Toolbar rootComponent={() => ToolbarCustom({ selection, handleEditRow })} />
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
