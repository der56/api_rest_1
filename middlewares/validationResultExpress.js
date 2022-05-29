import { validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //la respuesta de estado puede ser otra yo puse 400 pero es importante declarar una si no por defecto sera 200
        return res.status(400).json({ errors: errors.array() })
    }

    next();
}