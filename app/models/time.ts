import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Time = sequelize.define('time', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'time',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ]
  });
  Time.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here

  };
  return Time;
};