import { Box, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { fetchingPortfolios } from 'src/portfolio/service';
import { useAddProd } from 'src/product/hook/useAddProd';
import { fetchingSuppliers } from 'src/supply/service';
import { initialValues, styleButton, styleInput } from '../../constants';
import { IFormProfuctValuesProps, IOptions } from '../../interface';

export default function AddProduct() {
  const [portfolioOptions, setdataPortOptions] = useState<IOptions[]>([]);
  const [SupplierOptions, setDataSupOptions] = useState<IOptions[]>([]);
  const methods = useForm<IFormProfuctValuesProps>({
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting },
    setValue,
    watch,
    getValues,
  } = methods;

  const { data: dataPort, isSuccess: isSuccessProd } = useQuery(
    ['portfolios'],
    fetchingPortfolios
  );

  const { data: dataSup, isSuccess: isSuccessSup } = useQuery(
    ['suppliers'],
    fetchingSuppliers
  );

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Thêm sản phẩm thành công!', {
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

  const { mutate, isSuccess } = useAddProd({ onSuccess, onError });

  useEffect(() => {
    if (isSuccessProd) {
      const optionsTemp = dataPort.data.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setdataPortOptions(optionsTemp);
      setValue('portfolio', optionsTemp[0]?.value);
    }
  }, [isSuccessProd, dataPort?.data]);

  useEffect(() => {
    if (isSuccessSup) {
      const optionsTemp = dataSup.data.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setDataSupOptions(optionsTemp);
      setValue('supplier', optionsTemp[0]?.value);
    }
  }, [isSuccessSup, dataSup?.data]);

  const handleClickReset = () => {
    methods.reset();
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

  const handleClickAdd = () => {
    const dataAdd = {
      ...getValues(),
      total: +getValues('total'),
      price: +getValues('price'),
      idSup: +getValues('supplier'),
      idListPortfolio: [+getValues('portfolio')],
    };
    mutate(dataAdd);
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
          <RHFTextField name="name" label="Name" sx={styleInput} />
          <RHFTextField name="description" label="Description" sx={styleInput} />
          <RHFSelect name="portfolio" label="Portfolio">
            {portfolioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
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
          <Button sx={styleButton} onClick={handleClickAdd}>
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
