const restaurantModel = require('../models/restaurant');

exports.createRestaurant = async (req, res, next) => {
    try {
        const createdModel = await restaurantModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};

exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await restaurantModel.find({});
        res.status(200).json(restaurants);
    } catch (err) {
        next(err);
    }
};

exports.getRestaurantById = async (req, res, next) => {
    try {
        const rModel = await restaurantModel.findById(req.params.restaurant_id);
        if (rModel) {
            res.status(200).json(rModel);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
};

exports.updateRestaurant = async (req, res, next) => {
    try {
      const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
        req.params.restaurant_id,
        req.body,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      if (updatedRestaurant) {
        res.status(200).json(updatedRestaurant);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      next(error);
    }
  };
  
exports.deleteRestaurant = async (req, res, next) => {
    try {
        const deletedRestaurant = await restaurantModel.findByIdAndDelete(req.params.restaurant_id);
        
        if (deletedRestaurant) {
            res.status(200).json(deletedRestaurant);
            } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
};