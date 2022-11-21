import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { ICallback } from '../\binterface';
import { addPortf } from '../service';
export const useAddPortf = (callback: ICallback) => {
  return {
    ...useMutation(addPortf, {
      onSuccess: (data, context) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
