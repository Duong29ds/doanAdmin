import { Box, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { styleButton } from 'src/product/constants';
import { rowsSelector } from 'src/supply/supplier.slice';
import { handleGetIDList } from 'src/supply/utils';

export default function ToolbarCustom({
  selection,
  handleEditRow,
  handleDeleteRows,
  ...props
}: {
  selection: number[];
  handleEditRow: (id: number) => void;
  handleDeleteRows: (idlist: Array<number>) => void;
}) {
  const rows = useSelector(rowsSelector);
  const disabledEdit = selection.length !== 1;
  const disabledDelete = selection.length === 0;

  return (
    <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px', height: '50px' }}>
      <Button
        disabled={disabledEdit}
        onClick={() => {
          handleEditRow(rows[selection[0]].id);
        }}
      >
        Edit
      </Button>
      <Button
        disabled={disabledDelete}
        onClick={() => {
          const idListDelete = handleGetIDList(rows, selection);
          handleDeleteRows(idListDelete);
        }}
      >
        Delete
      </Button>
      <Button
        disabled={disabledDelete}
        onClick={() => {
          const idListDelete = handleGetIDList(rows, selection);
          handleDeleteRows(idListDelete);
        }}
      >
        Xuất đơn
      </Button>
    </Box>
  );
}
