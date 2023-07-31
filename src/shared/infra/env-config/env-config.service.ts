import { Injectable } from '@nestjs/common'
import { type EnvConfig } from './env-config.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor (private readonly configService: ConfigService) {
  }

  getAppPort (): number {
    return Number(this.configService.get<number>('PORT')) ?? 3333
  }

  getNodeEnv (): string {
    return this.configService.get<string>('NODE_ENV') ?? 'DEV'
  }
}
