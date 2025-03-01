export const emailRegex: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

export const nameRegex: RegExp = /^[a-zA-Z0-9_]{3,}$/;

export const phoneRegex: RegExp =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

/**
 * Checks if an email is valid.
 * @param email email to validate.
 * @returns `true` if the email is valid.
 */
export function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

/**
 * Checks if a password is valid.
 * @param password password to validate.
 * @returns `true` if the password is valid.
 */
export function validatePassword(password: string): boolean {
  return passwordRegex.test(password);
}

/**
 * Checks if a name is valid.
 * @param name name to validate.
 * @returns `true` if the name is valid.
 */
export function validateName(name: string): boolean {
  return nameRegex.test(name);
}

/**
 * Checks if a phone is valid.
 * @param phone phone to validate.
 * @returns `true` if the phone is valid.
 */
export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}
