import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { request } from 'services/request';
import useAuthStore from '../../store/useAuthStore';

interface Callbacks {
  success: (data: any) => void;
  fail: () => void;
}

interface UseGetAllQueryOptions {
  key?: string;
  url?: string;
  params?: any;
  hideErrorMsg?: boolean;
  enabled?: boolean;
  headers?: any;
  cb?: Callbacks;
  staleTime?: number; // Yangi parametr qo'shildi
}

const useGetAllQuery = ({
  key = 'get-all',
  url = '/',
  params = {},
  hideErrorMsg = false,
  enabled = true,
  headers = {},
  cb = {
    success: () => {},
    fail: () => {}
  },
  staleTime = 300000 // Default bo‘yicha 5 minut
}: UseGetAllQueryOptions): any => {
  const { isLoading, isError, data, error, isFetching, refetch }: any = useQuery({
    queryKey: [key, params],
    queryFn: () =>
      request.get(url, {
        params,
        headers
      }),
    // staleTime, // Ma'lumot qancha vaqt keshda saqlanishini belgilaydi
    enabled, // Query faqat enabled true bo'lganda ishlaydi
    onSuccess: ({ data }: any) => {
      cb?.success(data);
    },
    onError: (error: any) => {
      cb?.fail();
      if (!hideErrorMsg) {
        toast.error(`ERROR!!! ${url} api not working`);
      }
    }
  });

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    refetch
  };
};

export default useGetAllQuery;
