<document-tag>
  <head>
    <meta charset="utf-8"/>
    <meta content="IE=10" http-equiv="X-UA-Compatible"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>{ opts.title }</title>
    <script defer src={  '/dependencies/js/require.js' } type='text/javascript'></script>
    <script defer src={  '/dependencies/js/config/require.config.js' } type='text/javascript'></script>
    <!--script defer src={ assets( 'js/config/boost.js') } type='text/javascript'></script-->
    <!--script defer async='async' src={ assets( 'js/page/index.js') }></script-->
    <!--[if lt IE 9]> <script defer src='http://html5shiv.googlecode.com/svn/trunk/html5.js'></script> <![endif]-->
  </head>
  <body ref='bodyLayout' id='bodyLayout'>
    <h1>{opts.message}</h1>
  </body>
  <script>
    //  В структуре документа будет рендериться как тэг HTML
    var tagName = 'html'
    this.root.tagName = this.root.nodeName = tagName
    this.on('mount', function(){
      console.log(this.refs.bodyLayout)
      //riot.mount(this.refs.bodyLayout, 'layout-tag', this.opts)
    })
  </script>
</document-tag>
