var conf = 'https://raw.github.com/jsmarkus/hosted-plus/master/hosted-plus/example/config.json';
var app = HostedApp.remote(conf, function () {
	app.boot();
}).ready(function () {
	testExtension();
});
