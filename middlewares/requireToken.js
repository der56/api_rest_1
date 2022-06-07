import jwt from 'jsonwebtoken';

//import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
    try {
       let token = req.headers?.authorization;

       if(!token) throw new Error('no existe el token en el header, usa bearer');

       token = token.split(" ")[1]
       const { uid } = jwt.verify(token, process.env.JWT_SECRET );
       
       req.uid = uid;

       next();
    } catch (error) {
        console.log(error.message);
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