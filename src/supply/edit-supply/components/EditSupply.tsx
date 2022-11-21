import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { IFormSupplierValuesProps } from 'src/supply/\binterface';
import { useUpdateSup } from 'src/supply/hook/useUpdateSup';
import { fetchingSupplierById } from 'src/supply/service';
import { initialValues, styleButton, styleInput } from '../../constants';

export default function EditSupply() {
  const [dataEdit, setDataEdit] = useState({ id: 0, name: '', description: '' });
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const methods = useForm<IFormSupplierValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
    getValues,
  } = methods;

  const { data, error, isError, isLoading, isSuccess } = useQuery(
    [`supplier/${id}`],
    () => fetchingSupplierById(id)
  );

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Sửa nhà cung cấp thành công!', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };
  const onError = () => {
    enqueueSnackbar('Sửa thất bại', {
      variant: 'error',
    });
    methods.reset();
  };

  const { mutate } = useUpdateSup({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) {
      setDataEdit(data.data);
      methods.reset(data.data);
    }
  }, [isSuccess]);

  const handleClickCancel = () => {
    navigate(PATH_DASHBOARD.general.supplier.root);
  };

  const handleSubmitEdit = () => {
    mutate(getValues());
  };

  return (
    <FormProvider methods={methods}>
      <Label sx={{ backgroundColor: '#fff' }}>
        <Typography sx={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Edit Supplier
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
          <Button sx={styleButton} onClick={handleSubmitEdit}>
            Edit
          </Button>
          <Button sx={styleButton} onClick={handleClickCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
