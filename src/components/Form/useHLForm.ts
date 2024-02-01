import { useForm } from 'vee-validate';
import type { FormContext, FormOptions } from 'vee-validate';
import { trimFormValues } from './trimFormValues';

type GenericObject = Record<string, unknown>;

type CustomFormContext<TValues extends GenericObject> = Omit<FormContext<TValues>, 'handleSubmit'> & {
  handleSubmit: (callback: (values: TValues) => void) => (e: Event) => Promise<void|undefined>;
};

export function useHLForm<
  TValues extends GenericObject,
>(
  options: FormOptions<TValues>,
): CustomFormContext<TValues> {
  const form = useForm(options);

  function handleSubmit(callback: (values: TValues) => void) {
    return (e: Event) => form.handleSubmit((values) => {
      const trimmedValues = trimFormValues(values);

      return callback(trimmedValues);
    })(e);
  }

  return {
    ...form,
    handleSubmit,
  };
}
