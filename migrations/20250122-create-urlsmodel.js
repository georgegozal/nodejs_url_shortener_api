'use strict';

module.exports = {
    up: (QueryInterface, Sequelize) => {
        return QueryInterface.createTable('url_shortener', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            original: {
                allowNull: false,
                type: Sequelize.STRING
            },
            shortened: {
                allowNull: false,
                type: Sequelize.STRING
            }
        })
    },
    down: (QueryInterface, Sequelize) => {
        return QueryInterface.dropTable('url_shortener');
    }
}