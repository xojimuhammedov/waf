import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { request } from 'services/request';

const deleteRequest = (url: string) => request.delete(url);

const useDeleteQuery = ({ listKeyId }: any) => {
  const queryClient = useQueryClient();
  

  const { mutate, isError, error, isLoading }: any = useMutation(
    ({ url }: { url: string }) => deleteRequest(url),
    {
      onSuccess: (data: any) => {
        toast.success(data?.data?.message || 'SUCCESSFULLY DELETED');

        if (listKeyId) {
          queryClient.invalidateQueries(listKeyId);
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.error?.message || 'ERROR');
      }
    }
  );

  return {
    mutate,
    isError,
    error,
    isLoading
  };
};

export default useDeleteQuery;
