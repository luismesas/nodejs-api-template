var log = require('../src/util/log'),
  config = require('config'),
  mongoose = require('mongoose'),
  app = require('./app');

//
// MongoDB
//
mongoose.set('debug', true);

log.info('Connecting to MongoDB...');
mongoose.connect(config.get('db.conn'), function(err) {
  if (err) throw err;
  log.info('Connected to MongoDB');

  mongoose.connection.on('error', function(err) {
    log.error(err);
  });

  //
  // Init
  //
  var port = process.env.PORT || config.get('port');
  app.listen(port, function() {
    log.info('Server running at port ' + port);
  });
});
