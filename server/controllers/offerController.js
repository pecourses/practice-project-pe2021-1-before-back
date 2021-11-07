const ServerError = require('../errors/ServerError');
const { Offers } = require('./../models');

module.exports.getOffers = async (req, res, next) => {
  try {
    const foundOffers = await Offers.findAll({
      attributes: ['text', 'status'],
      raw: true,
    });
    res.status(200).send(foundOffers);
  } catch (err) {
    next(new ServerError());
  }
};
