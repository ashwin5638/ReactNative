export const isValidIndianE164 = (value: string) => /^\+91\d{10}$/.test(value);
export const isValidOtp = (value: string) => /^\d{6}$/.test(value);