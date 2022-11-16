import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { initialValues, styleButton, styleInput } from '../../constants';
import { IFormProfuctValuesProps } from '../../interface';

const optionsCategory = [
  { label: 'Keyboard', value: 'keyboard' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Light', value: 'light' },
];

export default function AddProduct() {
  const methods = useForm<IFormProfuctValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'product_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleClickReset = () => {
    methods.reset();
  };

  return (
    <FormProvider methods={methods}>
      <Label sx={{ backgroundColor: '#fff' }}>
        <Typography sx={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Add Product
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
          <RHFTextField name="product_name" label="Name" sx={styleInput} />
          <RHFTextField name="product_description" label="Description" sx={styleInput} />
          <RHFSelect name="product_portfolio" label="Portfolio">
            {optionsCategory.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            name="product_price"
            label="Price"
            sx={styleInput}
            type="number"
          />
          <RHFTextField
            name="product_post_service"
            label="Post Service"
            sx={styleInput}
          />
          <RHFUploadSingleFile
            name="product_image"
            sx={styleInput}
            maxSize={3145728}
            onDrop={handleDrop}
          />
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
