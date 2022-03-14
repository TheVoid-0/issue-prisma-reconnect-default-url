import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create client with custom URL
  const prismaClient = new PrismaClient({
    datasources: {
      db: { url: prepareUrl() },
    },
  });

  console.log('first log', await prismaClient.$queryRaw`SELECT 1`);

  await prismaClient.$disconnect();
  console.log('disconnected');

  try {
    console.log('second log', await prismaClient.$queryRaw`SELECT 1`);
    await app.listen(3000);
  } catch (error) {
    console.log('oops, tried to reconnect to default url!', error);
  }

  // Create client with custom URL
  const prismaClient2 = new PrismaClient({
    datasources: {
      db: { url: prepareUrl() },
    },
  });

  console.log('first log', await prismaClient2.$queryRaw`SELECT 1`);

  await prismaClient2.$disconnect();
  console.log('disconnected');

  try {
    console.log('second log', await prismaClient2.$connect());
    await app.listen(3000);
  } catch (error) {
    console.log(
      'oops, tried to reconnect to default url again MARVELOUS!',
      error,
    );
  }
}
bootstrap();

function prepareUrl(): string {
  let url = 'mysql://';
  // username
  url += process.env.DB_USER;
  url += ':';
  // password
  url += process.env.DB_PASSWORD;
  url += '@';
  // hostname
  url += process.env.DB_HOST;
  url += ':';
  // port
  url += process.env.DB_PORT ?? 3306;
  url += '/';
  return url;
}
