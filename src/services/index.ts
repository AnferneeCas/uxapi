import { Application } from '../declarations';
import users from './users/users.service';
import menu from './menu/menu.service';
import order from './order/order.service';
import reviews from './reviews/reviews.service'
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(menu);
  app.configure(order);
  app.configure(reviews)
}
