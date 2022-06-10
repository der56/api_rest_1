import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';
import jwt from 'jsonwebtoken';

export const register = async(req, res) =>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) throw { code: 11000 };

        user = new User({email, password})
        await user.save()

        //generar token con JWT
        return res.status(201).json({ok: true})
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({ error: "ya existe este usuario" });
        }
        return res.status(500).json({ error: "internal server error" });
    }
};

export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;

        let user = await User.findOne({ email });

        if(!user) 
            return res.status(403).json({ error: 'no existe este usuario'});

        const respuestaPassword = await user.comparePassword(password);

        if(!respuestaPassword)
            return res.status(403).json({ error: 'contraseña incorrecta'});

        const { token, expiresIn } = generateToken(user.id);

        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" });
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, uid: user.id });
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
    
}

export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error("no existe el token");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH );
        const { token, expiresIn } = generateToken(uid);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error);
        const TokenVerificationErrors = {
            "invalid signature": "la firma del JWT es invalid",
            "JWT expired": "JWT expirado",
            "invalid token": "Token invalido",
            "No Bearer": "utiliza el formato bearer",
            "jwt malformed": "JWT mal formado"
        };

        return res 
            .status(401)
            .send({ error: TokenVerificationErrors[error.message] });
    }   
}

export const logout = (req, res) =>{
    res.clearCookie('refreshToken');
    res.json({ ok: true });
}