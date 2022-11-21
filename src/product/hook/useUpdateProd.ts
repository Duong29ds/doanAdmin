import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../interface';
import { deleteProd, updateProd } from '../service';
export const useUpdateProd = (callback: ICallback) => {
  return {
    ...useMutation(updateProd, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
