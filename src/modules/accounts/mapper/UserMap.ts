// Serve para chamar a função definida na entidade com o @Expose
import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  // static => Equivale a um método de classe UserMap.toDTO()
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
