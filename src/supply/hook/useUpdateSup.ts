import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../\binterface';
import { addSup, updateSup } from '../service';
export const useUpdateSup = (callback: ICallback) => {
  return {
    ...useMutation(updateSup, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
