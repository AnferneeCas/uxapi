import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
const nodemailer = require("nodemailer");
interface Data {}

interface ServiceOptions {}

export class Order implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: any, params?: Params): Promise<Data> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uxappi@gmail.com",
        pass: "uxappi123", // naturally, replace both with your real credentials or an application-specific password
      },
    });
    console.log(data);
    const mailOptions = {
      from: "uxappi@gmail.com",
      to: data.user,
      subject: "Gracias por tu compra",

      html: "Dudes, we really need your money.",
    };

    await transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
