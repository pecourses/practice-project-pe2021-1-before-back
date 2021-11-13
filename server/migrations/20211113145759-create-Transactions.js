'use strict';
const { TRANSACTION_OPERATION_TYPES } = require('../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        operationType: {
          type: Sequelize.ENUM(
            TRANSACTION_OPERATION_TYPES.EXPENSE,
            TRANSACTION_OPERATION_TYPES.INCOME
          ),
          allowNull: false,
        },
        amount: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'restrict',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }) // Add constraint CHECK to table Transactions: amount>=0
      .then(() => {
        queryInterface.addConstraint('Transactions', {
          type: 'check',
          fields: ['amount'],
          where: { amount: { [Sequelize.Op.gte]: 0 } },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
