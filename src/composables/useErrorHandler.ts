import type { AxiosError } from 'axios'

export function useErrorHandler() {
  function handleError(error: AxiosError<{ message: string }>) {
    if (error.code === 'ERR_CANCELED') return

    // eslint-disable-next-line no-console
    console.log({ error }, error.response)
    // eslint-disable-next-line no-alert
    alert(error.response?.data.message)
  }

  return {
    handleError,
  }
}
