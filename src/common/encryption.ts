import * as bcrypt from 'bcrypt';

export class Encryption {
  async encrypPass(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async checkPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
