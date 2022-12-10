import axios, { AxiosStatic } from 'axios';
// import { Thumbnail } from "../interfaces/common.interfaces";
import { API_PRESIGN_URL, API_PRESIGN_URL_MULTI } from '../constants/apis';
import axiosInstance from 'src/common/utils/axios';

export async function presignUrl(file: any, axiosInstant?: AxiosStatic) {
  if (file) {
    try {
      const formData = new FormData();
      console.log(file);
      file?.forEach((item: any) => {
        formData.append('file', item);
      });
      // formData.append('file', file);

      const presignHeaderInfo = await axiosInstance.post(
        API_PRESIGN_URL_MULTI,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return presignHeaderInfo;
    } catch (error) {
      console.log(error);
      return Promise.reject({});
    }
  }
  // return Promise.resolve({});
}
