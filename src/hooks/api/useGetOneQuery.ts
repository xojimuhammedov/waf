import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { request } from 'services/request';

interface RequestOptions {
  id: string | null;
  key?: string | any;
  url?: string |any;
  enabled?: boolean;
  params?: any;
  showSuccessMsg?: boolean;
  showErrorMsg?: boolean;
}

interface ResponseData {
  isLoading: boolean;
  isError: boolean;
  data: any;
  error: any;
}

const fetchRequest = (url: string, params: any) => request.get(url, params);

const useGetOneQuery = ({
  id = null,
  key = 'get-one',
  url = 'test',
  enabled = true,
  params = {},
  showErrorMsg = true
}: RequestOptions): ResponseData => {
  const { isLoading, isError, data, error }: UseQueryResult<any, any> = useQuery(
    [key, id],
    () => fetchRequest(`${url}/${id}`, params),
    {
      onSuccess: () => {},
      onError: (data: any) => {
        if (showErrorMsg) {
          toast.error(data?.response?.data?.message || 'ERROR!!! api not working');
        }
      },
      enabled
    }
  );

  return {
    isLoading,
    isError,
    data,
    error
  };
};

export default useGetOneQuery;
