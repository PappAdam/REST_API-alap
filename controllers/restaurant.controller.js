const restaurantModel = require('../models/restaurant');

exports.createRestaurant = async (req, res, next) => {
    const data = new restaurantModel(req.body);
    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
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