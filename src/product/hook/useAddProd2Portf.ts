import { useMutation } from 'react-query';
import { updatePortf } from 'src/portfolio/service';
import { ICallback } from '../interface';
export const useAddProd2Portf = (callback: ICallback) => {
  return {
    ...useMutation(updatePortf, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
