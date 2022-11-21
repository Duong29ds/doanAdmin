import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../\binterface';
import { addSup, deleteSup, updateSup } from '../service';
export const useDeleteSup = (callback: ICallback) => {
  return {
    ...useMutation(deleteSup, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
