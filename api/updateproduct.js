import { db } from "@/src/util/firebaseadmin";
import adminmiddleware from "./adminmiddleware";

async function handler(req, res){
    if(req.method === "POST"){
        const { id, price, quantity, inStock, name, description, category } = req.body;
        db.collection('products').doc(id).set({
            price: price,
            quantity: quantity,
            inStock: inStock,
            name: name,
            description: description,
            category: category
        }, {merge: true}).then(response => {
            res.status(200).json({
                status: 200,
                message: "product updated successfully"
            })
        }).catch(err => {
            res.status(500).json({
                status: 500,
                message: "product can't be updated due to some error"
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

export default adminmiddleware(handler)