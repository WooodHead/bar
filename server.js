var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();

//静的コンテンツを返せる
app.use(serveStatic(__dirname));

app.listen(8080, app => {
  console.log('start')

  var Mocha = require('mocha');
  
  var mocha = new Mocha();

  // mocha.addFile('test/foo.js');
  // mocha.addFile('test/bar.js');
  mocha.addFile('test/e2e.js');
  
  // Run the tests.
  mocha.run(function(failures){

    process.on('exit', function () {
      process.exit(failures);  // exit with non-zero status if there were failures
    });
    app.shotdown();
  });

});
console.log('Server running on 8080');
console.log('process.env',process.env.CI)