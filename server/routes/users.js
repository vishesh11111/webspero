var express = require('express');
var router = express.Router();

const UserController = require("../controllers/user.controller")
const upload = require("../middleware/Upload");

/* GET users listing. */
router.post('/register', upload.single('file'), UserController.Register);
router.post('/login', UserController.login);
router.put('/details/update', UserController?.UpdateUserDetails);
router.get('/get/list', UserController?.getTopFiveUser);





module.exports = router;
