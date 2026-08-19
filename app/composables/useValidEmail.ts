const PATTERNT_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const useValidEmail = (
  emailVal: MaybeRefOrGetter<string>
) => {

  return computed(
    () => PATTERNT_EMAIL.test(toValue(emailVal).trim())
  )
}
