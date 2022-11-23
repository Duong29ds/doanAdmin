import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useUpdateProd } from 'src/product/hook/useUpdateProd';
import { fetchingProductById } from 'src/product/service';
import { initialValues, styleButton, styleInput } from '../../constants';
import { IFormProfuctValuesProps } from '../../interface';

const optionsCategory = [
  { label: 'Keyboard', value: 'keyboard' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Mouse', value: 'mouse' },
  { label: 'Light', value: 'light' },
];

export default function EditProduct() {
  const navigate = useNavigate();
  const [dataEdit, setDataEdit] = useState({});
  const params = useParams();
  const id = params?.id;
  const methods = useForm<IFormProfuctValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
    getValues,
  } = methods;

  const { data, error, isError, isLoading, isSuccess } = useQuery(
    [`supplier/${id}`],
    () => fetchingProductById(id)
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

  const { mutate } = useUpdateProd({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) {
      setDataEdit(data.data);
      methods.reset(data.data);
    }
  }, [isSuccess]);

  const handleClickCancel = () => {
    navigate(PATH_DASHBOARD.general.product.root);
  };

  const handleSubmitEdit = () => {
    mutate(getValues());
  };

  return (
    <FormProvider methods={methods}>
      <Label sx={{ backgroundColor: '#fff' }}>
        <Typography sx={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Edit Product
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
          <RHFSelect name="portfolio" label="Portfolio">
            {optionsCategory.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="price" label="Price" sx={styleInput} type="number" />
          <RHFTextField name="total" label="Total" sx={styleInput} type="number" />
          <RHFTextField name="post_service" label="Post Service" sx={styleInput} />
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
