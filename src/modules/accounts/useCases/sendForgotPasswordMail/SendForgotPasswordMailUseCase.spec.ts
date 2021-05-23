import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    const email = "henezeh@dagruppaw.ki";

    await usersRepositoryInMemory.create({
      name: "Alan Nelson",
      email,
      password: "1234",
      driver_license: "832139",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ni@mup.gq")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    const email = "so@ke.lu";

    await usersRepositoryInMemory.create({
      name: "Luke Carlson",
      email,
      password: "1234",
      driver_license: "363498",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(generateTokenMail).toBeCalled();
  });
});
