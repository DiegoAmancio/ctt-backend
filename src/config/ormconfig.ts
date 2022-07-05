import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const baseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    join(__dirname, '..', '/modules/**/infra/database/*.entity.{js,ts}'),
  ],
  // logging: true,
  migrations: [join(__dirname, '..', '/shared/migrations/*.{js,ts}')],
  ...(process.env.ISLOCALHOST === 'false' && {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
};

export const nestJsConfig = {
  ...baseConfig,
  autoLoadEntities: true,
};
const config = new DataSource(baseConfig);
export default config;
