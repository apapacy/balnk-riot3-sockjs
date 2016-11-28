import {Store} from './Store'
import * as riot from 'riot';

class First extends Store {

  get name() {
    return 'first';
  }

  constructor() {
    super();

    var self = this;

    this.on('input_value_change', function(value) {
      self.data.value = value;
      self.serialize()
      self.trigger('input_value_changed', self)
    })

    this.on('init_value', function(value) {
      self.trigger('input_value_changed', self)
    })


  }
}

export default new First();
