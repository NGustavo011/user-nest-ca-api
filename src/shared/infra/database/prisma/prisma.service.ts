import {
  Injectable,
  type OnModuleInit,
  type OnModuleDestroy
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleDestroy () {
    await this.$disconnect()
  }

  async onModuleInit () {
    await this.$connect()
  }
}
