import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { IFormPortfolioValuesProps } from 'src/portfolio/\binterface';
import { initialValues, styleButton, styleInput } from '../../constants';

export default function AddPortfolio() {
  const methods = useForm<IFormPortfolioValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = methods;

  const handleClickReset = () => {
    methods.reset();
  };

  return (
    <FormProvider methods={methods}>
      <Label sx={{ backgroundColor: '#fff' }}>
        <Typography sx={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Add Portfolio
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
          <RHFTextField name="supplier_name" label="Name" sx={styleInput} />
          <RHFTextField name="supplier_description" label="Description" sx={styleInput} />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px' }}>
          <Button sx={styleButton}>Add</Button>
          <Button sx={styleButton} onClick={handleClickReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
