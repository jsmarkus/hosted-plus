class HostedApp
  
  constructor: (options) ->
    @setOptions options

  boot: () ->
    paths = (files) =>
      for file in files
        if (file.match /^http(s)?\:/)
          file
        else
          @host + file
          
    if @js?
      jsfull = paths @js
      head.js.apply head, jsfull
      head.ready @onLoad if @onLoad?

    if @css?
      cssfull = paths @css
      @addCss (cssfull)
    
    this
  
  ready: (cb) ->
    @onLoad = cb
    this
  
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
    this
  
  setOptions: (options) ->
    if options?
      @host = options.host if options.host?
      @js = options.js if options.js?
      @css = options.css if options.css?
      @onLoad = options.onLoad if options.onLoad?

HostedApp.remote = (url, options, cb) ->
  if 'function' is typeof options
    [cb, options] = [options, {}]
  
  app = new HostedApp options
  xhr = new XMLHttpRequest
  xhr.open 'GET', url
  xhr.onreadystatechange = () ->
    if xhr.readyState == 4
      if xhr.status == 200
        opts = JSON.parse xhr.responseText
        app.setOptions opts
        cb app if cb?
  xhr.send()
  app

window.HostedApp = HostedApp


