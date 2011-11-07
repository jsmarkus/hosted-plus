(function() {
  var HostedApp;
  HostedApp = (function() {
    function HostedApp(options) {
      this.setOptions(options);
    }
    HostedApp.prototype.boot = function() {
      var css, cssfull, js, jsfull;
      if (this.js != null) {
        jsfull = (function() {
          var _i, _len, _ref, _results;
          _ref = this.js;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            js = _ref[_i];
            _results.push(this.host + js);
          }
          return _results;
        }).call(this);
        head.js.apply(head, jsfull);
        if (this.onLoad != null) {
          head.ready(this.onLoad);
        }
      }
      if (this.css != null) {
        cssfull = (function() {
          var _i, _len, _ref, _results;
          _ref = this.css;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            css = _ref[_i];
            _results.push(this.host + css);
          }
          return _results;
        }).call(this);
        this.addCss(cssfull);
      }
      return this;
    };
    HostedApp.prototype.ready = function(cb) {
      this.onLoad = cb;
      return this;
    };
    HostedApp.prototype.addCss = function(css) {
      var head, inject, style, _i, _len;
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
      for (_i = 0, _len = css.length; _i < _len; _i++) {
        style = css[_i];
        inject(style);
      }
      return this;
    };
    HostedApp.prototype.setOptions = function(options) {
      if (options != null) {
        if (options.host != null) {
          this.host = options.host;
        }
        if (options.js != null) {
          this.js = options.js;
        }
        if (options.css != null) {
          this.css = options.css;
        }
        if (options.onLoad != null) {
          return this.onLoad = options.onLoad;
        }
      }
    };
    return HostedApp;
  })();
  HostedApp.remote = function(url, options, cb) {
    var app, xhr, _ref;
    if ('function' === typeof options) {
      _ref = [options, {}], cb = _ref[0], options = _ref[1];
    }
    app = new HostedApp(options);
    xhr = new XMLHttpRequest;
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      var opts;
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          opts = JSON.parse(xhr.responseText);
          app.setOptions(opts);
          if (cb != null) {
            return cb(app);
          }
        }
      }
    };
    xhr.send();
    return app;
  };
  window.HostedApp = HostedApp;
}).call(this);
