module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/modules/**/infra/database/*.entity.js'],
  migrations: ['dist/modules/**/infra/database/*.migration.js'],
  cli: {
    migrationsDir: 'src/modules/**/infra/database',
  },
  synchronize: process.env.DB_SYNC == 'true',
  ...(process.env.ISLOCALHOST === 'false' && {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
};
