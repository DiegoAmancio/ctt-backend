import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const hashPasswordTransform = {
  to(password: string): string {
    const salt = genSaltSync(parseFloat(process.env.SALT));
    const newPassword = hashSync(password, salt);
    return newPassword;
  },
  from(hash: string): string {
    return hash;
  },
};
export const comparePassword = (password: string, encryptedPassword: string) =>
  compareSync(password, encryptedPassword);
