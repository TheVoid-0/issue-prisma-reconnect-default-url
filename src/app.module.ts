import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigServiceConfiguration } from './app.module.config';

@Module({
  imports: [ConfigModule.forRoot(getConfigServiceConfiguration())],
  controllers: [],
  providers: [],
})
export class AppModule {}
