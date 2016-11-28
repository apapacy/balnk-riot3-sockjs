import {Service} from 'services/Service';
import 'riotcontrol';
import events from 'events';

class First extends Service {

    getRandom() {
        this.postJson('/random', {})
            .then((data) => {
                RiotControl.trigger(events.first.randomValueChanged, data);
            })
            .catch((err) => {
                RiotControl.trigger('random_number_error', err);
            })
    }

}

export default new First();
