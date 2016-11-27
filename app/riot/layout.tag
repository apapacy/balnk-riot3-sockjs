<layout-tag>
  <div data-is={ tag }>123</div>
  <button onclick={ click }>Click!</button>
  <button onclick={ clickMe }>Click me!</button>
  <script>
    click(event){
      alert('clicked')
      this.tag = 'first-tag'
    }
    clickMe(event){
      alert('clicked')
      this.tag = 'second-tag'
    }
  </script>
</layout-tag>
