(function() {
  var HostedApp, hst;
  HostedApp = (function() {
    function HostedApp(host, options) {
      this.host = host;
      this.options = options;
    }
    HostedApp.prototype.boot = function() {
      var js, jsfull;
      if (this.options.js != null) {
        jsfull = (function() {
          var _i, _len, _ref, _results;
          _ref = this.options.js;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            js = _ref[_i];
            _results.push(this.host + js);
          }
          return _results;
        }).call(this);
        console.log(jsfull);
        head.js.apply(head, jsfull);
      }
      if (this.options.onLoad != null) {
        head.ready(this.options.onLoad);
      }
      if (this.options.css != null) {
        return this.addCss(this.options.css);
      }
    };
    HostedApp.prototype.addCss = function(css) {
      var item, _i, _len, _results;
      if ('string' === typeof css) {
        css = [css];
      }
      _results = [];
      for (_i = 0, _len = css.length; _i < _len; _i++) {
        item = css[_i];
        _results.push(console.log("CSS " + item + " loading"));
      }
      return _results;
    };
    return HostedApp;
  })();
  hst = new HostedApp('http://ajax.googleapis.com/', {
    js: ['ajax/libs/jquery/1.6/jquery.min.js'],
    css: ['d', 'e']
  });
  hst.boot();
}).call(this);
