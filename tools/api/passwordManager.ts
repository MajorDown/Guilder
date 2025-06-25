import { UserPassword } from "@/types";
import bcrypt from "bcrypt";

export const passwordCrypter = async (password: UserPassword) => {
  const salt = await bcrypt.genSalt(Number(process.env.HASH_TURNS));
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
};

export const passwordChecker = async (password: UserPassword, hashedpassword: string) => {
  const isPasswordValid = await bcrypt.compare(password, hashedpassword);
  return isPasswordValid;
};
