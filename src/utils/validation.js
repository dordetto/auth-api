export function validatePassword(password) {
  if (!password) return false;

  const minLength = 5;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (password.length < minLength || !hasUppercase || !hasNumber) {
    return false;
  }

  return true;
}