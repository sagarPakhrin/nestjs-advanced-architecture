import { ApplicationBootstrapOptions } from '@/common/application-bootstrap.options';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EVENT_STORE_CONNECTION } from './constants';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27018/vf-read-db', {
    MongooseModule.forRoot(
      // 'mongodb+srv://sagar:SagarLama123@event-sourcing.ajbel.mongodb.net/?retryWrites=true&w=majority&appName=event-sourcing',
      'mongodb+srv://sagar:SagarLama123@event-sourcing.holix.mongodb.net/?retryWrites=true&w=majority&appName=event-sourcing',
      {
        connectionName: EVENT_STORE_CONNECTION,
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        },
        // version: ServerApiVersion.v1,
        // strict: true,
        // deprecationErrors: true,
        // directConnection: true,
        // readPreference: 'primary',
      },
    ),
  ],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
          ]
        : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
