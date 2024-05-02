import type { AxiosError } from 'axios'

export function useErrorHandler() {
  function handleError(error: AxiosError<{ message: string }>) {
    if (error.code === 'ERR_CANCELED') return

    console.log({ error }, error.response)
    alert(error.response?.data.message)
  }

  return {
    handleError,
  }
}
