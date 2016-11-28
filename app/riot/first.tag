<first-tag>
  <div>first</div>
  <input type='text' ref='input' value={value} onkeyup={onKeyUp}>
  <script>
    const riot = require('riot')
    const stores = require('stores')
    const _ = require('lodash')
    var self

    onKeyUp(event) {
      RiotControl.trigger('input_value_change', this.refs.input.value)
    }


    this.on('mount', function(){
      self = this
      RiotControl.on('input_value_changed', function(store){
        _.assign(self, store.data)
        riot.update()
      })
      RiotControl.trigger('init_value')
    })

    this.on('ummount', function(){
      self = void 0
      RiotControl.off('input_value_changed')
    })


  </script>
</first-tag>
