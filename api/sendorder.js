import apimiddleware from "./apimiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res){
    if(req.method === "POST"){
        const {decodedToken, orderID, paymentID, paymentMode, address, time, items, totalAmount, delivered} = req.body;
        const { phone_number, uid } = decodedToken;
        // console.log(decodedToken)
        // console.log(decodedToken.uid)
        // console.log(decodedToken.phone_number)
        /*
        items = {
            baseprice,
            name,
            id,
            quantity,
            total,
            weight
        }
        */
       /*
       address = {
            firstName,
            lastName,
            email,
            phoneNumber1,
            phoneNumber2,
            location,
            pin
       }
       */
      db.collection('orders').doc(uid).collection("ORDERS").doc(orderID).set({
            uid: uid,
            loggedInNumber: phone_number,
            orderID: orderID,
            paymentID: paymentID,
            paymentMode: paymentMode,
            time: time,
            address: address,
            items: items,
            totalAmount: totalAmount,
            delivered: delivered
      }).then(response => {
            res.status(200).json({
                status: 200,
                message: "order placed successfully"
            })
      }).catch(err => {
            res.send(502).json({
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

export default apimiddleware(handler)