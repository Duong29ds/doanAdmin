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
  { name: 'supplier_name', title: 'Name' },
  { name: 'supplier_description', title: 'Description' },
];
const rows = [
  {
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
  {
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
  {
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
  {
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
  {
    supplier_name: 'Key board',
    supplier_description: '1000000',
  },
];

export default function SupplyList() {
  const [selection, setSelection] = useState([]);
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
