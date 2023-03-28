import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "a61000e4-67ac-4d67-9138-cfb544847377",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "a61000e4-67ac-4d67-9138-cfb544847377",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "a61000e4-67ac-4d67-9138-cfb544847377",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Test car",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      brand: "brand_test",
      category_id: "a61000e4-67ac-4d67-9138-cfb544847377",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "a61000e4-67ac-4d67-9138-cfb544847377",
    });

    expect(cars).toEqual([car]);
  });
});
