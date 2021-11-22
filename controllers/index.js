const router = require('express').Router();

const homeRoutes = require('./home-routes.js');

const apiRoutes = require('./api');

const dashboardRoutes = require('./dashboard-routes.js');




// routing paths
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);


router.use((req, res) => {
    res.status(404).end();
  });

// middle router is exported for usage @ router that is incoming
module.exports = router;