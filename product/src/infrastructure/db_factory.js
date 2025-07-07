const MongoDBProductRepository = require('./database/mongodb/mongodb_repository');
const SQLProductRepository = require('./database/mysql/mysql_repository');

class DatabaseFactory {
    static createRepository() {
        const dbType = process.env.DB_TYPE || 'mysql';
        switch (dbType) {
            case 'mongodb':
                return new MongoDBProductRepository();
            case 'mysql':
                return new SQLProductRepository();
            default:
                throw new Error(`Invalid database type: ${dbType}`);
        }
    }
}
module.exports = DatabaseFactory;