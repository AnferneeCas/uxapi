// Initializes the `menu` service on path `/menu`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Reviews } from './reviews.class';
import createModel from '../../models/reviews.model';
import hooks from './reviews.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'reviews': Reviews & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews', new Reviews(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews');

  service.hooks(hooks);
}
