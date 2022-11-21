import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../\binterface';
import { addSup } from '../service';
export const useSupplier = (callback: ICallback) => {
  return {
    ...useMutation(addSup, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
