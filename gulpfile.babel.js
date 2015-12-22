// Kreativgebiet GmbH
//
// Require all gulp tasks from the subfolder
// and let them call themselfes

require('dotenv').load();
require('require-dir')('./tasks', { recurse: true });
