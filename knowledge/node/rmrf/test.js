const rmrf = require('./index');

// rmrf(true);
rmrf('./test', _ => console.log('rmrf over'));