const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'RateUs',
    tableName: 'rate_us',
    target: 'RateUs',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
            default: () => 'uuid_generate_v4()', // Requires extension
        },
        stars: {
            type: 'int',
            nullable: false,
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        isDeleted: {
            type: 'boolean',
            default: false,
        },
    },
});
