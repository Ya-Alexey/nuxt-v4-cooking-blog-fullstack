export const useValidInputScheme = <
  TForm extends Record<keyof TForm, string>,
  TScheme extends Record<keyof TForm, InputValidProps>
>(
  form: Ref<TForm>,
  schema: MaybeRef<TScheme>, 
) => {
  const validFields = computed(() => {
    const formValue = form.value;
    const schemaValue = unref(schema);

    const validObj = Object.keys(formValue).reduce((acc, key) => {
      const formKey = key as keyof TForm;
      const rule = schemaValue[formKey];
      acc[formKey] = rule 
        ? checkIsValidInput(formValue[formKey], rule) 
        : false;
      return acc;
    }, {} as Record<keyof TForm, boolean>);
    return validObj;
  });

  const hasSomeInvalid = computed(() => {
    const formValue = form.value;
    return Object.keys(formValue).some((key) => !validFields.value[key as keyof TForm])
  });

  return {
    validFields,
    hasSomeInvalid,
  };
}

