const restaurantModel = require('../../models/restaurant');
const httpMocks = require('node-mocks-http');
const newRestaurants = require('../mock-data/new-restaurant.json');
const restaurantController = require('../../controllers/restaurant.controller');

jest.mock("../../models/restaurant.js");

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

// describe('RestaurantController.createRestaurant', () => {
//     beforeEach(() => {
//         req.body = newRestaurant;
//     });

//     it('should have a createRestaurant function', () => {
//         expect(typeof restaurantController.createRestaurant).toBe('function');
//     });

//     it('should call restaurantModel.save', async () => {
//         await restaurantController.createRestaurant(req, res, next);
//         expect(restaurantModel.save).toHaveBeenCalled();
//     });

//     it('should return 201 response code', async () => {
//         restaurantModel.save.mockReturnValue(newRestaurant[0]);
//         await restaurantController.createRestaurant(req, res, next);
//         expect(res.statusCode).toBe(201);
//         expect(res._isEndCalled()).toBeTruthy();
//     });

//     it('should return json body in response', async () => {
//         restaurantModel.save.mockReturnValue(newRestaurant[0]);
//         await restaurantController.createRestaurant(req, res, next);
//         expect(res._getJSONData()).toStrictEqual(newRestaurant[0]);
//     });

//     it('should handle errors', async () => {
//         const errorMessage = { message: 'Error saving restaurant' };
//         const rejectedPromise = Promise.reject(errorMessage);
//         restaurantModel.save.mockReturnValue(rejectedPromise);
//         await restaurantController.createRestaurant(req, res, next);
//         expect(res.statusCode).toBe(400);
//         expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
//     });
// });

describe("Restaurant find by id", () => {
    it("should return json body and response code 200", async () => {
        restaurantModel.findById.mockReturnValue(newRestaurants[0]);
        await restaurantController.getRestaurantById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newRestaurants[0]);
    });
});

describe("Restaurant get all", () => {
    it("should return json body and response code 200", async () => {
        restaurantModel.find.mockReturnValue(newRestaurants);
        await restaurantController.getRestaurants(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newRestaurants);
    });
});

describe("Restaurant create", () => {
    it("should return json body and response code 200", async () => {
        restaurantModel.create.mockReturnValue(newRestaurants[0]);
        await restaurantController.createRestaurant(req, res, next);
        console.log(newRestaurants[0]);

        expect(res._getJSONData()).toStrictEqual(newRestaurants[0]);
    });
});