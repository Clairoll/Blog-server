import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Friend = sequelize.define('friend', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    url: {
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
    tableName: 'friend',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: false,
    indexes: [
      {
        
      }
    ]
  });
  Friend.associate = function(this: Model<any, any>, models: Models) {
  };
  return Friend;
};