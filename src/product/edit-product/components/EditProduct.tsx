import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useUpdateProd } from 'src/product/hook/useUpdateProd';
import { fetchingProductById } from 'src/product/service';
import { fetchingSuppliers } from 'src/supply/service';
import { initialValues, styleButton, styleInput } from '../../constants';
import { IFormProfuctValuesProps, IOptions } from '../../interface';

export default function EditProduct() {
  const [SupplierOptions, setDataSupOptions] = useState<IOptions[]>([]);
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
    watch,
  } = methods;

  const { data, error, isError, isLoading, isSuccess } = useQuery([`product/${id}`], () =>
    fetchingProductById(id)
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

  const { data: dataSup, isSuccess: isSuccessSup } = useQuery(
    ['suppliers'],
    fetchingSuppliers
  );

  useEffect(() => {
    if (isSuccessSup) {
      const optionsTemp = dataSup.data.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setDataSupOptions(optionsTemp);
    }
  }, [isSuccessSup, dataSup?.data]);

  useEffect(() => {
    if (isSuccess) {
      setDataEdit(data.data);
      methods.reset({ ...data.data, supplier: data.data.supplier.id });
    }
  }, [isSuccess, data?.data]);

  const handleClickCancel = () => {
    navigate(PATH_DASHBOARD.general.product.root);
  };

  const handleSubmitEdit = () => {
    const dataAdd = {
      ...getValues(),
      total: +getValues('total'),
      price: +getValues('price'),
      idSup: +getValues('supplier'),
    };
    console.log(dataAdd, 'dataAdd');
    mutate(dataAdd);
  };

  const values = watch();

  const removeAllArticleImgs = () => {
    setValue('images', []);
  };

  const removeArticleImg = (file: File | string) => {
    const filteredItems =
      values.images && values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  const handleDropArticleImgs = useCallback(
    (acceptedFiles: File[]) => {
      const images = values.images || [];
      const file = acceptedFiles[0];

      if (file) {
        setValue('images', [
          ...images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      }
    },

    [setValue, values.images]
  );

  const handleUploadImgs = () => {};

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
          <RHFSelect name="supplier" label="Supplier">
            {SupplierOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField name="price" label="Price" sx={styleInput} type="number" />
          <RHFTextField name="total" label="Total" sx={styleInput} type="number" />
          <RHFTextField name="post_service" label="Post Service" sx={styleInput} />
          <RHFUploadMultiFile
            showPreview
            name="images"
            maxSize={3145729}
            onDrop={handleDropArticleImgs}
            onRemove={removeArticleImg}
            onRemoveAll={removeAllArticleImgs}
            onUpload={handleUploadImgs}
          />
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
