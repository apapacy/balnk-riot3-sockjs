import * as riot from 'riot';
import events from '../events';
import * as _ from 'lodash';
import services from '../services';

class CreditCard {
    constructor() {
        this.data = {};

        riot.observable(this);

        this.on(events.creditCard.init, function() {
            services.services.creditCard.taslinkSidToken();
        });

        this.on(events.creditCard.taslinkSidToken, function(data) {
            this.data = _.assign({}, this.data, data);
            this.trigger(events.creditCard.updated, this);
            this.trigger(events.creditCard.initialize, this);
        });

        this.on(events.creditCard.ok, function(data) {
            this.data = _.assign({}, this.data, {
                message: 'Ваша кредитная карта успешно прошла проверку',
                retryButtonEnabled: false,
            });
            this.trigger(events.creditCard.updated, this);
        });

        this.on(events.creditCard.error, function(data) {
            this.data = _.assign({}, this.data, {
                message: 'Ваша кредитная карта не прошла проверку',
                retryButtonEnabled: true,
            });
            this.trigger(events.creditCard.updated, this);
        });

    }
}

export default new CreditCard();
