// Kreativgebiet GmbH
//
// Require all gulp tasks from the subfolder
// and let them call themselfes

require('require-dir')('./tasks', { recurse: true });
