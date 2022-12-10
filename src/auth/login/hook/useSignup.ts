import { useMutation } from 'react-query';
import { ILoginCallback } from '../interface';
import { getSignup } from '../service';
export const useAuthSignup = (callback: ILoginCallback) => {
  return {
    ...useMutation(getSignup, {
      onSuccess: (data, context) => {
        // const { token } = data.data;
        // dispatch(setAccessToken(token));
        // dispatch(setLogin(true));
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
