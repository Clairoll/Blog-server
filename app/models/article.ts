import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Article = sequelize.define('article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    read: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    innocuous: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
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
    tableName: 'article',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ]
  });
  Article.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here

    // 所属用户
    this.belongsTo( models['user'], {
      foreignKey: 'userId'
    } );

    // 所属分类
    this.belongsTo( models['category'], {
      foreignKey: 'categoryId'
    } );

    // 包含评论
    this.hasMany( models['comment'] );
  };
  return Article;
};