'use strict';
import {Tag} from 'riot';
console.log(Tag)
export class Layout extends Tag {
  constructor(){
    super()
  }
  get name() {
    return 'LAYOUT'
  }
  get tmpl() {
    return '<div>123</div>'
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
