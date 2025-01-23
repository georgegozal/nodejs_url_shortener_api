'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (QueryInterface, Sequelize) {
    return QueryInterface.addColumn('url_shortener', 'visited', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
  });
  },

  async down (queryInterface, Sequelize) {
    down: (QueryInterface, Sequelize) => {
      return QueryInterface.removeColumn('url_shortener', 'visited');
  }
  }
};
