import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { IFormPortfolioValuesProps } from 'src/portfolio/\binterface';
import { useAddPortf } from 'src/portfolio/hook/useAddPortf';
import { initialValues, styleButton, styleInput } from '../../constants';

export default function AddPortfolio() {
  const methods = useForm<IFormPortfolioValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
    getValues,
  } = methods;

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Thêm nhà cung cấp thành công!', {
      variant: 'success',
      autoHideDuration: 1000,
    });
    methods.reset();
  };
  const onError = () => {
    enqueueSnackbar('Thêm thất bại', {
      variant: 'error',
    });
  };

  const { mutate, isSuccess } = useAddPortf({ onSuccess, onError });

  const handleClickReset = () => {
    methods.reset();
  };

  const handleClickBtnAdd = () => {
    mutate({
      name: getValues('name'),
      description: getValues('description'),
    });
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
          <RHFTextField name="name" label="Name" sx={styleInput} />
          <RHFTextField name="description" label="Description" sx={styleInput} />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', padding: '0px 10px' }}>
          <Button sx={styleButton} onClick={handleClickBtnAdd}>
            Add
          </Button>
          <Button sx={styleButton} onClick={handleClickReset}>
            Reset
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
