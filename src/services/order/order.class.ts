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
    var results= data.cart
    var content = results.reduce(function(a:any, b:any) {
      return a + '<tr><td>' + b.name + '</a></td><td><p>' + b.description + '</p></td><td>' + b.qt + '</td><td>' + b.price*b.qt + '</td></tr>';
    }, '');

    const mailOptions = {
      from: "uxappi@gmail.com",
      to: data.user,
      subject: "Gracias por tu compra",

      html: `
      <strong>
          <div>
              <table>
                  <thead>
                      <tr>
                          <th>Pizza</th>
                          <th>Descripcion</th>
                          <th>Cantidad</th>
                          <th>Precio</th>
                      </tr>
                  </thead>
                  <tbody>` + content + `</tbody>
              </table>
          </div>
          
          <div><h3>Total a pagar: `+data.total+`</h3></div>
          <div><h3>Direccion de entrega:`+data.direccion+`</h3></div>
          </strong>
          `
          
      ,
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
