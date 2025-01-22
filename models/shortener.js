/* jshint indent: 2 */

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Urls = sequelize.define('Urls', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    original: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortened: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'url_shortener'
  });

  return Urls;
};
