import { User } from "../models/User.js";

export const register = async(req, res) =>{
    const {email, password} = req.body;
    try {
        const user = new User({email, password})
        await user.save()
        return res.json({ok: true})
    } catch (error) {
        console.log(error.code);
        if(error.code === 11000){
            return res.status(400).json({ error: "ya existe este user" });
        }
    }
};

export const login = async(req, res) =>{
    res.json({ ok: "Login" })
};