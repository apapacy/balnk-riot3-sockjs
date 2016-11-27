import {Store} from './Store'

class First extends Store {

  get name(){
    return 'first';
  }

  constructor(){
    super();
  }

}

export default new First();
