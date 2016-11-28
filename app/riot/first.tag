<first-tag>
  <div>first</div>
  <input type='text' ref='input' value={value} onkeyup={onKeyUp}>
  <h2>{random}</h2>
  <script>
    const riot = require('riot')
    const stores = require('stores')
    const services = require('services')
    const events = require('events')
    const _ = require('lodash')
    var self

    onKeyUp(event) {
      RiotControl.trigger(events.first.inputValueChanged, this.refs.input.value)
    }

    this.on('mount', function(){
      self = this
      RiotControl.on(events.first.updated, function(store){
        console.log('updated')
        _.assign(self, store.data)
        riot.update()
      })
      RiotControl.trigger(events.first.init)
    })

    this.on('ummount', function(){
      self = void 0
      RiotControl.off(events.first.updated)
    })


  </script>
</first-tag>
