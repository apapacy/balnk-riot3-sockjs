'use strict';
import {Tag} from 'riot';
console.log(Tag)
export default class Inner extends Tag {
  constructor(){
    super()
  }
  get name() {
    return 'inner'
  }
  get tmpl() {
    return '<div>789</div>'
  }
  get attrs() {
    return 'class="{ className }"'
  }
  get css() {
    return 'my-tag p{ color: blue; }'
  }
  onCreate(opts) {
    this.message = opts.message
  }
  click() {
    this.message = 'goodbye'
  }

}
