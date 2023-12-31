var express = require('express');
var router = express.Router();

const UserController = require("../controllers/user.controller")
const upload = require("../middleware/Upload");
const authenticateJWT = require("../middleware/authenticationJWT")

/* GET users listing. */
router.post('/register', upload.single('file'), UserController.Register);
router.post('/login', UserController.login);
router.put('/details/update', authenticateJWT, upload.single('file'), UserController?.UpdateUserDetails);
router.get('/get/list', authenticateJWT, UserController?.findNearestUsers);
router.get('/details/show', authenticateJWT, UserController?.userDetails);







module.exports = router;
