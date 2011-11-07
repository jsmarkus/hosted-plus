var conf = 'https://raw.github.com/jsmarkus/hosted-plus/master/src/example/config.json';
var app = HostedApp.remote(conf, function () {
	app.boot();
}).ready(function () {
	testExtension();
});
