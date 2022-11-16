import { Box, Button } from '@mui/material';
import React from 'react';
import { IFormPortfolioValuesProps } from 'src/portfolio/\binterface';
import { styleButton } from 'src/product/constants';

export default function ToolbarCustom({
  selection,
  handleEditRow,
  ...props
}: {
  selection: number[];
  handleEditRow: (id: number) => void;
}) {
  const disabledEdit = selection.length > 1;
  return (
    <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px', height: '50px' }}>
      <Button>Add</Button>
      <Button
        disabled={disabledEdit}
        onClick={() => {
          console.log(selection, 'selection');
          handleEditRow(selection[0]);
        }}
      >
        Edit
      </Button>
    </Box>
  );
}
