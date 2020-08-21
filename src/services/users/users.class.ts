import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { Params } from "@feathersjs/feathers";
// A type interface for our user (it does not validate any data)
interface UserData {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  githubId?: string;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  create(data: UserData, params?: Params) {
    // This is the information we want from the user signup data
    console.log(data);
    const { email, password, githubId, name } = data;
    // Use the existing avatar image or return the Gravatar for the email

    // The complete user
    const userData = {
      email,
      name,
      password,
      githubId,
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
}
