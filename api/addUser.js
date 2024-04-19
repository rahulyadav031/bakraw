import middleware from "./apimiddleware";
import { addUser } from "@/src/util/firebaseadmin";

async function handler(req, res) {
    if (req.method === "POST") {
        const uid = req.body.uid;
        const phoneNumber = req.body.phoneNumber;
        const creationTime = req.body.creationTime;
        const lastSignInTime = req.body.lastSignInTime;
        const result = addUser(uid, phoneNumber, creationTime, lastSignInTime);
        result
            .then(data => {
                return res.status(200).json({
                    status: 200,
                    message: "user added successfully"
                })
            })
            .catch(e => {
                return res.status(502).json({
                    status: 502,
                    message: "database error"
                })
            })
    }
    else{
        res.status(405).json({
            status: 405,
            message: "only POST allowed"
        })
    }
}

export default middleware(handler);