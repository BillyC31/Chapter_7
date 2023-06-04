const {Car} = require("../models");
const CarController = require("./CarController")

describe("CarController", () => {  
  describe("#handleListCar", () => {
    it("should call res.status(200) and res.json with list of Car instances", async () => {
      const name = "Toyota";
      const price = 100000;
      const size = 5;
      const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";
      

      const mockRequest = {};

      const cars = [];

      for (let i = 0; i < 10; i++) {
        const car = new Car({ name, price, size, image  });
        cars.push(car);
      }

      const mockCarModel = { findAll: jest.fn().mockReturnValue(cars) };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const carController = new CarController({ carModel: mockCarModel });

      await carController.handleListCars(mockRequest, mockResponse);
      expect(mockCarModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(cars);
    });
  });

describe("#handleCreateCar", () => {
    it("should call res.status(201) and res.json with Car instance", async () => {
        const name = "Toyota";
        const price = 100000;
        const size = 5;
        const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";

      const mockRequest = {
        body: {
            name,
            price,
            size,
            image,
        },
      };

      const car = new Car({ name, price, size, image });
      const mockCarModel = { create: jest.fn().mockReturnValue(car) };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const carController = new CarController({ carModel: mockCarModel });

      await carController.handleCreateCar(mockRequest, mockResponse);

      expect(mockCarModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(car);
    });

    it("should call res.status(422) and res.json with Car instance", async () => {
      const err = new Error("Something");
      const name = "Toyota";
      const price = 100000;
      const size = 5;
      const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";
      const isCurrentlyRented = false;

      const mockRequest = {
        body: {
            name,
            price,
            size,
            image,
            isCurrentlyRented
        },
      };

      const mockCarModel = {
        create: jest.fn().mockReturnValue(Promise.reject(err)),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const carController = new CarController({ carModel: mockCarModel });

      await carController.handleCreateCar(mockRequest, mockResponse);

      expect(mockCarModel.create).toHaveBeenCalledWith({
            name,
            price,
            size,
            image,
            isCurrentlyRented
      });
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });

  describe("#handleGetcar", () => {
    it("should call res.status(200) and res.json with car instance", async () => {
        const name = "Toyota";
        const price = 100000;
        const size = 5;
        const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockCar = new Car({ name, price, size, image });
      const mockCarModel = {};
      mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const carController = new CarController({ carModel: mockCarModel });
      await carController.handleGetCar(mockRequest, mockResponse);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
    });
  });

  describe("#handleUpdateCar", () => {
    it("should call res.status(200) and res.json with Car instance", async () => {
        const name = "Toyota";
        const price = 100000;
        const size = 5;
        const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";
        const isCurrentlyRented = false;

      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
            name,
            price,
            size,
            image,
            isCurrentlyRented
        },
      };

      const mockCar = new Car({ name, price, size, image, isCurrentlyRented });
      mockCar.update = jest.fn().mockReturnThis();

      const mockCarModel = {};
      mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const carController = new CarController({ carModel: mockCarModel });
      await carController.handleUpdateCar(mockRequest, mockResponse);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockCar.update).toHaveBeenCalledWith({ name, price, size, image,isCurrentlyRented });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
    });    
  });

  describe("#handleDelete", () => {
    it("should call res.status(204)", async () => {
      const name = "Toyota";
        const price = 100000;
        const size = 5;
        const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockCar = new Car({ name, price, size, image });
      mockCar.destroy = jest.fn();

      const mockCarModel = {};
      mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.end = jest.fn().mockReturnThis();

      const carController = new CarController({ carModel: mockCarModel });
      await carController.handleDeleteCar(mockRequest, mockResponse);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockCar.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toHaveBeenCalled();
    });
  });

  describe("#getCarFromRequest", () => {
    it("should find car by pK", async () => {
        const name = "Toyota";
        const price = 100000;
        const size = 5;
        const image = "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=18af899611be";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockCar = new Car({ name, price, size, image });
      const mockCarModel = {};
      mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const carController = new CarController({ carModel: mockCarModel });
      await carController.handleGetCar(mockRequest, mockResponse);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
    });
  });

})
