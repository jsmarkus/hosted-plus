(function() {
  var HostedApp;
  HostedApp = (function() {
    function HostedApp(options) {
      this.options = options;
    }
    HostedApp.prototype.boot = function() {
      var css, cssfull, js, jsfull;
      if (this.options.js != null) {
        jsfull = (function() {
          var _i, _len, _ref, _results;
          _ref = this.options.js;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            js = _ref[_i];
            _results.push(this.options.host + js);
          }
          return _results;
        }).call(this);
        head.js.apply(head, jsfull);
        if (this.options.onLoad != null) {
          head.ready(this.options.onLoad);
        }
      }
      if (this.options.css != null) {
        cssfull = (function() {
          var _i, _len, _ref, _results;
          _ref = this.options.css;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            css = _ref[_i];
            _results.push(this.options.host + css);
          }
          return _results;
        }).call(this);
        return this.addCss(cssfull);
      }
    };
    HostedApp.prototype.addCss = function(css) {
      var head, inject, style, _i, _len, _results;
      if ('string' === typeof css) {
        css = [css];
      }
      head = document.getElementsByTagName('head')[0];
      inject = function(cssfile) {
        var link, name, val, _ref;
        link = document.createElement("link");
        _ref = {
          rel: 'stylesheet',
          type: 'text/css',
          href: cssfile
        };
        for (name in _ref) {
          val = _ref[name];
          link.setAttribute(name, val);
        }
        return head.appendChild(link);
      };
      _results = [];
      for (_i = 0, _len = css.length; _i < _len; _i++) {
        style = css[_i];
        _results.push(inject(style));
      }
      return _results;
    };
    return HostedApp;
  })();
  HostedApp.remote = function(url, cb) {
    var xhr;
    xhr = new XMLHttpRequest;
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      var app, opts;
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          opts = JSON.parse(xhr.responseText);
          app = new HostedApp(opts);
          return cb(app);
        }
      }
    };
    return xhr.send();
  };
  HostedApp.remote('https://raw.github.com/jsmarkus/hosted-plus/master/hosted-plus/example/config.json', function(app) {
    return app.boot();
  });
}).call(this);
