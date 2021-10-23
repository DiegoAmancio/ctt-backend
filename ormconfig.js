module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  entities: ['dist/modules/**/infra/database/entities/*.js'],
  migrations: ['dist/modules/**/infra/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/modules/**/infra/database/migrations/',
  },
  synchronize: process.env.DB_SYNC == 'true',
};
