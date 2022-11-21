import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../interface';
import { deleteProd } from '../service';
export const useDeleteProd = (callback: ICallback) => {
  return {
    ...useMutation(deleteProd, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
