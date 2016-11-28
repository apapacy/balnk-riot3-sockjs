<first-tag>
  <div>first</div>
  <input type='text' ref='input' value={ opts.value } onkeyup={onKeyUp}>
  <h2>{ opts.random }</h2>
  <script>
    const riot = require('riot')
    const stores = require('stores')
    const services = require('services')
    const events = require('events')
    const _ = require('lodash')
    var self = this

    onKeyUp(event) {
      RiotControl.trigger(events.first.inputValueChanged, this.refs.input.value)
    }

    this.on('mount', function(){
      RiotControl.on(events.first.updated, function(store){
        _.assign(self.opts, store.data)
        self.update()
      })
      RiotControl.trigger(events.first.init)
    })

      RiotControl.off(events.first.updated)
    this.on('ummount', function(){
    })


  </script>
</first-tag>
