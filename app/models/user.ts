import { Sequelize, DataTypes, Models, Model } from "sequelize";
import * as md5 from "md5";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.CHAR(32),
      unique: true,
      allowNull: false,
      defaultValue: '',
    },
    mobile: {
      type: DataTypes.CHAR(12),
      unique: true,
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      defaultValue: ''
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
    tableName: 'user',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ],
    // defaultScope: {
    //   attributes: {
    //     exclude: ['password']
    //   }
    // },
  });
  User.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here
    // // 留言
    this.hasMany( models['criticism'] );
    
    // // 文章
    this.hasMany( models['article'] );

    // // 评论
    this.hasMany( models['comment'] );
  };
  return User;
};