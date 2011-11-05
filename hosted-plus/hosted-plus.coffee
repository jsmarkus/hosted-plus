class HostedApp
  
  constructor: (@host, @options) ->
  
  boot: () ->
    if @options.js?
      jsfull = (@host + js for js in @options.js)
      console.log jsfull
      head.js.apply head, jsfull
    head.ready @options.onLoad if @options.onLoad?
    @addCss (@options.css) if @options.css?
    
  addCss: (css) ->
    css = [css] if 'string' is typeof css
    for item in css
      console.log "CSS #{item} loading"


hst = new HostedApp 'http://ajax.googleapis.com/' 
  js : ['ajax/libs/jquery/1.6/jquery.min.js']
  css : ['d', 'e']

#hst.addCss ['bla','asd']
hst.boot();
