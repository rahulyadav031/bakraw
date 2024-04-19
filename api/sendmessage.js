import apimiddleware from "./apimiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res){
    if(req.method === "POST"){

        const date = new Date().toUTCString()
        const { name, email, message, number } = req.body

        db.collection('messages').doc().set({
            number: number,
            name: name,
            email: email,
            message: message,
            date: date
        }).then(response => {
            res.status(200).json({
                status: 200,
                message: "message sent successfully"
            })
        }).catch(err => {
            res.status(500).json({
                status: 500,
                message: "server error"
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

export default handler;