
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const userModel = require("../models/user.model");

let userController = {};

const newToken = (user) => {
    // return jwt.sign({ user }, process.env.scret);
    return jwt.sign({ user }, process.env.JWTSECRET);
};

const getLanglan = async (zipCode) => {
    // Fetch lat/lang using Zippopotamus API
    try {
        const apiUrl = `https://api.zippopotam.us/in/${zipCode}`; // Assuming the country code is 'us'

        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const { places } = response.data;
            const { latitude, longitude } = places[0];
            return { status: true, latitude, longitude };
        } else {
            return { status: false, message: "Invalid Zipcode" }
        }
    } catch (error) {
        return { status: false, message: "Invalid Zipcode" }
    }
}

userController.Register = async (req, res) => {
    try {
        const { body } = req;
        const checkUser = await UserModel.findOne({ email: body?.email });
        if (checkUser) {
            res.status(400).json({ status: false, message: "user already exist please login" })
        } else {
            let dataLanitude = await getLanglan(body?.zipCode)
            if (dataLanitude?.status) {
                const createUser = await UserModel.create({
                    ...body,
                    location: {
                        type: 'Point',
                        coordinates: [dataLanitude?.longitude, dataLanitude?.latitude]
                    }, file: req?.file?.filename
                });
                res.status(200).json({ status: true, message: "user create successfully", data: createUser })
            } else {
                res.status(400).json({ status: false, message: dataLanitude?.message })
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
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
        let { body } = req;
        const userData = req?.user?.user;
        if (body?.zipCode) {
            let dataLanitude = await getLanglan(body?.zipCode)
            if (dataLanitude?.status) {
                body = {
                    ...body, location: {
                        type: 'Point',
                        coordinates: [dataLanitude?.longitude, dataLanitude?.latitude]
                    },
                }
                if (req?.file) {
                    body = { ...body, file: req?.file?.filename }
                }
                const updateUser = await UserModel.findByIdAndUpdate(userData?._id, body);
                res.status(200).json({ status: true, message: "user update successfully", data: updateUser })
            } else {
                res.status(400).json({ status: false, message: dataLanitude?.message })
            }
        } else {
            if (req?.file) {
                body = { ...body, file: req?.file?.filename }
            }
            const updateDetails = await UserModel.findByIdAndUpdate(userData?._id, body)
            // const 
            res.status(200).json({ status: true, message: "update user succefully" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}


userController.userDetails = async (req, res) => {
    try {
        const getUserData = await UserModel.findById(req?.user?.user?._id)
        res.status(200).json({ status: true, message: "get user succefully", data: getUserData })
    } catch (error) {
        res.status(500).json({ status: false, messsage: error.message })
    }
}

userController.findNearestUsers = async (req, res) => {
    try {
        const langitude = req?.user?.user?.location.coordinates;
        const nearestUsers = await UserModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [langitude[0], langitude[1]]
                    },
                    $maxDistance: 10000
                }
            }
        }).limit(5);
        res.status(200).json({ status: true, message: "get data succefully", data: nearestUsers })
    } catch (error) {
        console.log(error?.message);
        res.status(500).json({ status: false, message: error.message })
    }
};

module.exports = userController;