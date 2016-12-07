var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/field', function(req, res, next) {
    const {field, value} = req.body;
    const error = errorMessage(field, value);
    if (error) {
        res.status(422).json({
            result: 'error',
            error
        });
    } else {
        res.status(200).json({
            result: 'OK',
            error: ''
        });
    }
});

module.exports = router;


function errorMessage(field, value) {
    switch (field) {
        case 'email':
            if (String(value).search(/^[^@]+@[^@]+\.[^@]+$/) === -1) {
                return 'mailformed email address';
            }
        default:
            return void 0;
    }
}
