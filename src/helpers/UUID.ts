import { v5 as uuidv5, validate } from 'uuid';

const keyId = process.env.UUID_GENERATE;

export class UUID {
  static generateId(name: string) {
    return uuidv5(`${name}${Date.now()}`, keyId);
  }
}
