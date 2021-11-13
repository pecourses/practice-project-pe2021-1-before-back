'use strict';
const { Model } = require('sequelize');
const { TRANSACTION_OPERATION_TYPES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate (models) {
      Transaction.belongsTo(models.Users, { foreignKey: 'userId' });
    }
  }
  Transaction.init(
    {
      operationType: {
        type: DataTypes.ENUM(
          TRANSACTION_OPERATION_TYPES.EXPENSE,
          TRANSACTION_OPERATION_TYPES.INCOME
        ),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        validate: { min: 0 },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transactions',
      timestamps: true,
    }
  );
  return Transaction;
};
