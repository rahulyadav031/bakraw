import adminmiddleware from "./adminmiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res){
    if(req.method === "POST"){
        const {uid, orderID, delivered} = req.body;
        db.collection('orders').doc(uid).collection('ORDERS').doc(orderID).set({
            delivered: delivered
        }, {merge: true}).then(response => {
            res.status(200).json({
                status: 200,
                message: 'order status updated successfully'
            })
        }).catch(err => {
            console.log("error while updating the status of the order", err);
            res.status(504).json({
                status: 504,
                message: "error while updating the status of the order"
            })
        })
    }
    else{
        res.status(403).json({
            status: 403,
            message: "only POST method allowes"
        })
    }
}

export default adminmiddleware(handler);