const express = require('express');
const router = express.Router();


router.get('/cart', async (req, res, next) => {
  req.user === undefined ? res.redirect('/user/no-permission') : next()
});


module.exports = router;