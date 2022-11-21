import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../\binterface';
import { deletePortf, updatePortf } from '../service';
export const useUpdatePortf = (callback: ICallback) => {
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
