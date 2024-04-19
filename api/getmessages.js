import adminmiddleware from "./adminmiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res){
    if(req.method === "GET"){
        let messages = []
        db.collection('messages').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                messages.push(doc.data())
            })
        }).then(response => {
            res.status(200).json({
                status: 200,
                message: "messages fetched succesfully",
                data: messages
            })
        })
    }
    else{
        res.status(405).json({
            status: 405,
            message: "only GET allowed"
        })
    }
}

export default adminmiddleware(handler)