import type { AxiosError } from 'axios'

export function useErrorHandler() {
  function handleError(error: AxiosError<{ message: string }>) {
    console.log(error.response)

    alert(error.response?.data.message)
  }

  return {
    handleError,
  }
}
