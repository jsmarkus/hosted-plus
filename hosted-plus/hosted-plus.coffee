class HostedApp
  
  constructor: (@options) ->
  
  boot: () ->
    if @options.js?
      jsfull = (@options.host + js for js in @options.js)
      head.js.apply head, jsfull
      head.ready @options.onLoad if @options.onLoad?

    if @options.css?
      cssfull = (@options.host + css for css in @options.css)
      @addCss (cssfull)
    
  addCss: (css) ->
    css = [css] if 'string' is typeof css

    head = document.getElementsByTagName('head')[0]
    
    inject = (cssfile) ->
      link=document.createElement("link")
      link.setAttribute(name, val) for name, val of {
        rel: 'stylesheet'
        type: 'text/css'
        href: cssfile}
      head.appendChild link

    inject style for style in css

HostedApp.remote = (url, cb) ->
  xhr = new XMLHttpRequest
  xhr.open 'GET', url
  xhr.onreadystatechange = () ->
    if xhr.readyState == 4
      if xhr.status == 200
        opts = JSON.parse xhr.responseText
        app = new HostedApp(opts)
        cb app
  xhr.send()

HostedApp.remote 'https://raw.github.com/jsmarkus/hosted-plus/master/hosted-plus/example/config.json', (app) ->
  app.boot()
