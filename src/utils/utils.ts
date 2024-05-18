import * as bcrypt from 'bcryptjs';

const hash = async (data: string) => {
  return await bcrypt.hash(data, parseInt(process.env.SALT_OR_ROUNDS));
};
const verifyHash = async (data: string, hash: string) => {
  return await bcrypt.compare(data, hash);
};
export { hash, verifyHash };
