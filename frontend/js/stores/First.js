import {Store} from './Store'
import * as riot from 'riot';
import services from 'services';
import events from 'events';

console.log(events)
class First extends Store {

  get name() {
    return 'first';
  }

  constructor() {
    super();
    var self = this;

    this.on(events.first.inputValueChanged, function(value) {
      self.data.value = value;
      self.serialize();
      self.trigger(events.first.updated, self)
    })

    this.on(events.first.randomValueChanged, function(data) {
      self.data.random = data.random;
      self.serialize();
      self.trigger(events.first.updated, self)
    })

    this.on(events.first.init, function(value) {
      if (!this.data.random) {
        services.first.getRandom();
      } else {
        self.trigger(events.first.updated, self)
      }
    })
  }
}

export default new First();
