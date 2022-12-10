import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  p: 4,
};

type Props = {
    open:boolean,
    children: JSX.Element,
  };

export default function Popup({open,children,...props}:Props) {

  return (
    <div>
      <Modal
        open={open}
        onClose={()=>{}}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}