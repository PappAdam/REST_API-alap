const restaurantModel = require('../../models/restaurant');
const httpMocks = require('node-mocks-http');
const restaurants = require('../mock-data/new-restaurant.json');
const restaurantController = require('../../controllers/restaurant.controller');

restaurantModel.findById = jest.fn();
restaurantModel.create = jest.fn();
restaurantModel.find = jest.fn();
restaurantModel.findByIdAndDelete = jest.fn();
restaurantModel.findByIdAndUpdate = jest.fn();

let req, res, next;
let restaurant_id = "30075446";

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});


describe("restaurantController.getRestaurantById", () => {
    it("should have a getRestaurantById", () => {
      expect(typeof restaurantController.getRestaurantById).toBe("function");
    });
    it("should call restaurantModel.findById with route parameters", async () => {
      req.params.restaurant_id = restaurant_id;
      await restaurantController.getRestaurantById(req, res, next);
      expect(restaurantModel.findById).toBeCalledWith(restaurant_id);
    });
    it("should return json body and response code 200", async () => {
      restaurantModel.findById.mockReturnValue(restaurants[0]);
      await restaurantController.getRestaurantById(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual(restaurants[0]);
    });
    it("should handle errors in getRestaurantById", async () => {
      const errorMessage = { message: "Error finding ..." };
      const rejectedPromise = Promise.reject(errorMessage);
      restaurantModel.findById.mockReturnValue(rejectedPromise);
      await restaurantController.getRestaurantById(req, res, next);
      expect(next).toBeCalledWith(errorMessage);
    });
    it("should return 404 when item doesnt exist", async () => {
      restaurantModel.findById.mockReturnValue(null);
      await restaurantController.getRestaurantById(req, res, next);
      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("restaurantController.getRestaurants", () => {
    it("should have a getRestaurants function", () => {
        expect(typeof restaurantController.getRestaurants).toBe("function");
    });
    it("should call restaurantModel.find({})", async () => {
        await restaurantController.getRestaurants(req, res, next);
        expect(restaurantModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all todos", async () => {
        restaurantModel.find.mockReturnValue(restaurants);
        await restaurantController.getRestaurants(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(restaurants);
    });
    it("should handle errors in getRestaurants", async () => {
        const errorMessage = { message: "Error finding" };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.find.mockReturnValue(rejectedPromise);
        await restaurantController.getRestaurants(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe("restaurantController.createRestaurant", () => {
    beforeEach(() => {
        req.body = restaurants[0];
    });
    it("should have a createRestaurant function", () => {
        expect(typeof restaurantController.createRestaurant).toBe("function");
    });
    it("should call restaurantModel.create", () => {
        restaurantController.createRestaurant(req, res, next);
        expect(restaurantModel.create).toBeCalledWith(restaurants[0]);
    });
    it("should return 201 response code", async () => {
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async () => {
        restaurantModel.create.mockReturnValue(restaurants[0]);
        await restaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(restaurants[0]);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.create.mockReturnValue(rejectedPromise);
        await restaurantController.createRestaurant(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe("restaurantController.updateRestaurant", () => {
    it("should have a updateRestaurant function", () => {
        expect(typeof restaurantController.updateRestaurant).toBe("function");
    });
    it("should call restaurantModel.findByIdAndUpdate with Id parameter", async () => {
        req.params.restaurant_id = restaurant_id;
        req.body = restaurants[0];
        await restaurantController.updateRestaurant(req, res, next);
        expect(restaurantModel.findByIdAndUpdate).toBeCalledWith(restaurant_id, restaurants[0], {
        new: true,
        useFindAndModify: false,
        });
    });
    it("should return a response with json and code 200", async () => {
        req.params.restaurant_id = restaurant_id;
        req.body = restaurants[0];
        restaurantModel.findByIdAndUpdate.mockReturnValue(restaurants[0]);
        await restaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(restaurants[0]);
    });
    it("should handle errors in updateRestaurant", async () => {
        const errorMessage = { message: "Error finding ..." };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await restaurantController.updateRestaurant(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
    it('should return 404 when item doesnt exist', async () => {
        restaurantModel.findByIdAndUpdate.mockReturnValue(null);
        await restaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});
  
describe("restaurantController.deleteRestaurant", () => {
    it("should have a deleteRestaurant function", () => {
        expect(typeof restaurantController.deleteRestaurant).toBe("function");
    });
    it("should call restaurantModel.findByIdAndDelete with Id parameter", async () => {
        req.params.restaurant_id = restaurant_id;
        await restaurantController.deleteRestaurant(req, res, next);
        expect(restaurantModel.findByIdAndDelete).toBeCalledWith(restaurant_id);
    });
    it("should return a response with json and code 200", async () => {
        req.params.restaurant_id = restaurant_id;
        restaurantModel.findByIdAndDelete.mockReturnValue({deleted: true});
        await restaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual({deleted: true});
    });
    it("should handle errors in deleteRestaurant", async () => {
        const errorMessage = { message: "Error deleting ..." };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await restaurantController.deleteRestaurant(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
    it('should return 404 when item doesnt exist', async () => {
        restaurantModel.findByIdAndDelete.mockReturnValue(null);
        await restaurantController.deleteRestaurant(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});