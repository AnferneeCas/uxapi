// Initializes the `menu` service on path `/menu`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Menu } from './menu.class';
import createModel from '../../models/menu.model';
import hooks from './menu.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'menu': Menu & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/menu', new Menu(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('menu');

  service.hooks(hooks);
}
