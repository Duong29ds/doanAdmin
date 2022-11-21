import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../interface';
import { addProd, deleteProd } from '../service';
export const useAddProd = (callback: ICallback) => {
  return {
    ...useMutation(addProd, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
