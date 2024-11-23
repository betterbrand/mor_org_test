import { useCallback } from 'react'

import { useFetch } from '@/hooks/useFetch'

const useApiService = () => {
  const fetchService = useFetch()

  const getAboutPage = useCallback((): Promise<string> => {
    return fetchService.get(`/api/about`)
  }, [fetchService])

  // const getModelDetails = useCallback(
  //   (name: string) => {
  //     return fetchService.post(`/api/modeldetails`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name }),
  //     })
  //   },
  //   [fetchService],
  // )

  return {
    getAboutPage,
  }
}

export default useApiService
