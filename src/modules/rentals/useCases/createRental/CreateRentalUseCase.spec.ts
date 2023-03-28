import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

dayjs.extend(utc);

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let tomorrow: Date;

describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
    tomorrow = dayjsDateProvider.tomorrow();
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Carro Turbo",
      description: "Um carro muito veloz",
      daily_rate: 100,
      license_plate: "1234XX",
      fine_amount: 40,
      category_id: "1234",
      brand: "Marca de carro",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: tomorrow,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      user_id: "12345",
      expected_return_date: tomorrow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "00000",
        expected_return_date: tomorrow,
      })
    ).rejects.toEqual(
      new AppError("There is a rental in progress for this user")
    );
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      user_id: "12345",
      expected_return_date: tomorrow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "00000",
        car_id: "1111",
        expected_return_date: tomorrow,
      })
    ).rejects.toEqual(new AppError("Car is not available"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
