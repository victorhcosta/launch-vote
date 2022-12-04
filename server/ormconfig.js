const {
	TYPEORM_USERNAME,
	TYPEORM_PASSWORD,
	TYPEORM_DATABASE,
	TYPEORM_HOST,
	TYPEORM_PORT,
	TYPEORM_ENTITIES,
	TYPEORM_ENTITIES_DIR,
} = process.env;

module.exports = {
	type: 'postgres',
	username: TYPEORM_USERNAME,
	password: TYPEORM_PASSWORD,
	host: TYPEORM_HOST,
	port: TYPEORM_PORT,
	database: TYPEORM_DATABASE,
	entities: [TYPEORM_ENTITIES],
	cli: {
		entitiesDir: TYPEORM_ENTITIES_DIR,
	},
};
