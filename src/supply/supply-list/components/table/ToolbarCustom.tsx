import { Box, Button } from '@mui/material';
import React from 'react';
import { styleButton } from 'src/product/constants';

export default function ToolbarCustom({ selection, ...props }: { selection: never[] }) {
  const disabledEdit = selection.length > 1;
  return (
    <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px', height: '50px' }}>
      <Button>Add</Button>
      <Button disabled={disabledEdit}>Edit</Button>
    </Box>
  );
}
