module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  entities: ['dist/modules/**/infra/typeorm/entities/*.js'],
  migrations: ['dist/modules/**/infra/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: 'src/modules/**/infra/typeorm/migrations/',
  },
  synchronize: process.env.DB_SYNC == 'true',
};
