export const useValidEmail = (
  emailVal: MaybeRefOrGetter<string>
) => {

  return computed(
    () => PATTERNT_EMAIL.test(toValue(emailVal).trim())
  )
}
