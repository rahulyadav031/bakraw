import apimiddleware from "./apimiddleware";
const Razorpay = require('razorpay');

async function handler(req, res){
    if(req.method === "POST"){
        const { uid, amount } = req.body;
        let numberOfInstances = [];
        let razorpayInstance;
        if(numberOfInstances.length === 0){
            razorpayInstance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RZP_MID, key_secret: process.env.NEXT_PUBLIC_RZP_MKEY })
        }
        else{
            razorpayInstance = numberOfInstances[0]
        }
        let date = new Date().getTime()
        let receipt = `${uid.slice(0,7)}${date}`;
        let options = {
            amount: amount,
            currency: "INR",
            receipt: receipt
        }
        razorpayInstance.orders.create(options, (err, order) => {
            if(err){
                console.log(err)
                res.status(401).json({
                    status:401,
                    message: "Some error generating the order id"
                })
            }
            else{
                res.status(200).json({
                    status: 200,
                    data: order
                })
            }
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