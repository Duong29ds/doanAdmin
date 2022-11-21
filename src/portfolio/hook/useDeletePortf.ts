import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../\binterface';
import { deletePortf } from '../service';
export const useDeletePortf = (callback: ICallback) => {
  return {
    ...useMutation(deletePortf, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
