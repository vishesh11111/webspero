
const UserModel = require("../models/user.model");

let userController = {};

const newToken = (user) => {
    // return jwt.sign({ user }, process.env.scret);
    return jwt.sign({ user }, process.env.JWTSECRET);
};

userController.Register = async (req, res) => {
    try {
        const { body } = req;
        console.log(body)
        const checkUser = await UserModel.findOne({ email: body?.email });
        if (checkUser) {
            res.status(400).json({ message: "user already exist please login" })
        } else {
            const createUser = await UserModel.create(body);
            res.status(200).json({ message: "user create successfully", data: createUser })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

userController.login = async (req, res) => {
    try {
        let body = req.body;
        const user = await UserModel.findOne({ 'email': body.email });
        if (user) {
            const matchPas = await user.matchPassword(body.password);
            if (!matchPas) {
                res.status(400).send({ status: false, message: "Check Email or Password" })
            } else {
                const token = newToken(user);
                res.status(200).json({ status: true, message: "Login succefully", data: user, token: token })
            }
        } else {
            res.status(400).send({ status: false, message: "SignUp First" })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message, })
    }
}


userController.UpdateUserDetails = async (req, res) => {
    try {

    } catch (error) {

    }
}


userController.getTopFiveUser = async (req, res) => {
    try {

    } catch (error) {

    }
}


module.exports = userController;