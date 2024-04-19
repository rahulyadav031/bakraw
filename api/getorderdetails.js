import apimiddleware from "./apimiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res) {
    if (req.method === "GET") {
        const uid = req.body.decodedToken.uid;
        let orders = [];
        db.collection('orders').doc(uid).collection('ORDERS').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                orders.push(doc.data())
            })
        }).then(response => {
            res.status(200).json({
                status: 200,
                message: "orders fetched succesfully",
                data: orders
            })
        })
    }
    else {
        res.status(405).json({
            status: 405,
            message: "only GET allowed"
        })
    }
}

export default apimiddleware(handler)