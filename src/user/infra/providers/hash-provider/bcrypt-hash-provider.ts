import { type HashProvider } from '@/shared/application/providers/hash-provider'
import { compare, hash } from 'bcrypt'

export class BcryptHashProvider implements HashProvider {
  async generateHash (payload: string): Promise<string> {
    return await hash(payload, 6)
  }

  async compareHash (payload: string, hash: string): Promise<boolean> {
    return await compare(payload, hash)
  }
}
