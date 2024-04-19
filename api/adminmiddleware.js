import { validateJwt } from "@/src/util/JwtUtils";

const adminmiddleware = handler => async (req, res) => {
    const tokenString = req.headers['authorization'] ? req.headers['authorization'].split(" ") : null;

    if (!tokenString) {
        return res.status(403).json({
            status: 403,
            message: "No Header Provided"
        });
    }
    else if (!tokenString[1]) {
        return res.status(403).json({
            status: 403,
            message: "No Token String"
        });
    }
    else {
        const { valid } = validateJwt(tokenString[1]);
        // console.log(tokenString);
        // console.log(valid);
        if(valid){
            return handler(req, res);
        }
        else{
            return res.status(403).json({
                status: 403,
                message: "not the valid atkn token"
            })
        }
    }
}

export default adminmiddleware;