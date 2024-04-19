import apimiddleware from "./apimiddleware";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

async function handler(req, res){
    if(req.method === "POST"){
       const { payment_id, order_id, signature } = req.body;
    // console.log("secret key: ", secretkey);
       let paymentVerified = validatePaymentVerification({"order_id": order_id, "payment_id": payment_id}, signature, process.env.NEXT_PUBLIC_RZP_MKEY)
    //    console.log("paymentverified: ",paymentVerified);
       if(paymentVerified){
            res.status(200).json({
                status: 200,
                verified: true
            })
       }
       else{
            res.status(403).json({
                status: 403,
                verified: false
            })
       }
    }
    else{
        res.status(405).json({
            status: 405,
            message: "only POST allowed"
        })
    }
}

export default apimiddleware(handler);