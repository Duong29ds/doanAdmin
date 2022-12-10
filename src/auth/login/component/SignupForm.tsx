// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { dispatch } from 'src/common/redux/store';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/common/routes/paths';
import {
  FormProvider,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { defaultValues } from '../constants';
import { IFormSignUpValuesProps } from '../interface/interface';
import { setShowPassword, showPasswordSelector } from '../login.slice';
import { SignupSchema } from '../schema/login.schema';
import { useAuthSignup } from '../hook/useSignup';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();
  const showPassword = useSelector(showPasswordSelector);

  const methods = useForm<IFormSignUpValuesProps>({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Đăng ký thành công', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };
  
  const onError = () => {
    enqueueSnackbar('Đăng ký thất bại ! xin kiểm tra lại thông tin', {
      variant: 'error',
    });
  };

  const { mutate, isSuccess } = useAuthSignup({ onSuccess, onError });
  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.general.app);
  }, [isSuccess]);
  const onSubmit = (data: IFormSignUpValuesProps) => {
    mutate({name:data.name, phone_number:data.phonenumber,address:data.address, email: data.email, password: data.password });
  };

  const handleBack=()=>{
    navigate(PATH_AUTH.login);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="Name" />
        <RHFTextField name="phonenumber" label="Phone Number" />
        <RHFTextField name="address" label="Address" />
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => dispatch(setShowPassword(!showPassword))}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirm_password"
          label="Password confirm"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => dispatch(setShowPassword(!showPassword))}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Button onClick={handleBack}>Back to sign in</Button>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Sign up
      </LoadingButton>
    </FormProvider>
  );
}
