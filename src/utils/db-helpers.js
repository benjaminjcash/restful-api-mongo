const User = require("../models/user.model");
const Item = require("../models/item.model");

exports.doRegisterUser = async (newUser) => {
    return newUser
            .save()
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doGetUser = async (username) => {
    return User
            .findOne({ username })
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doGetUserWithPassword = async (username) => {
    return User
            .findOne({ username }, '+password')
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doGetItem = async (id) => {
    return Item
            .findById(id)
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doGetAllItems = async () => {
    return Item
            .find({})
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doUpdateItem = async (id, body) => {
    return Item
            .findByIdAndUpdate(id, body, { new: true })
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}