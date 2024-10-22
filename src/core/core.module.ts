import { ApplicationBootstrapOptions } from '@/common/application-bootstrap.options';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
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
              database: 'alarms',
              autoLoadEntities: true,
              synchronize: true,
            }),
          ]
        : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
