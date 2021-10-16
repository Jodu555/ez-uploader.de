const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

function createTables() {

    database.createTable('accounts', {
        options: {
            K: ['UUID'],
            PK: 'UUID',
        },
        UUID: 'varchar(64)',
        username: 'TEXT',
        email: 'TEXT',
        password: 'TEXT',
    });

    database.createTable('folders', {
        options: {
            K: ['UUID'],
            PK: 'UUID',
            FK: {
                'account_UUID': 'accounts/UUID',
            },
        },
        UUID: 'varchar(64)',
        account_UUID: 'varchar(64)',
        name: 'TEXT',
        parent_UUID: 'TEXT',
        public: 'BOOL',
        share: 'BOOL'
    });

    database.createTable('entrys', {
        options: {
            K: ['UUID'],
            PK: 'UUID',
            FK: {
                'folder_UUID': 'folders/UUID',
            },
        },
        UUID: 'varchar(64)',
        folder_UUID: 'varchar(64)',
        type: 'varchar(64)',
        parent_UUID: 'TEXT',
        public: 'BOOL',
        share: 'BOOL'
    });

    database.get('folders').actions = {
        getRootFolder: async (UUID) => {
            console.log('Get Root Folder' + UUID);
            const folder = await database.get('folders').getOne({ account_UUID: UUID, name: 'ROOT', unique: true });
            return folder;
        },
    };

    database.get('entrys').actions = {
        getAllFromAccount(account_UUID) {

        },
        owns(UUID, account_UUID) {

        }
    }


}

module.exports = { createTables };