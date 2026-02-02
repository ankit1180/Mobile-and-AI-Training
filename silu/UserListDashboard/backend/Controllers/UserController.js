// const User = require("../models/User");
import User from "../models/user.model.js"

export const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await User.updateOne(
            { _id: id },
            { $set: updatedData }
        );

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(400).json('user not found');
        } else {
            res.status(200).json('User Deleted Successfully');
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const findByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.find({
            name: { $regex: name, $options: "i" }
        });
        if (user.length == 0) {
            res.status(400).json('User not found');
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export const findAll = async (req, res) => {
  try {
    const users = await User.find(); 

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
