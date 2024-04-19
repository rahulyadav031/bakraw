import adminmiddleware from "./adminmiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res){
    if(req.method === "GET"){
        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.size;

        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.size;

        const messagesSnapshot = await db.collection('messages').get();
        const messages = messagesSnapshot.size;

        const collectionRef = db.collection('orders');
        const DocumentRefs = [];
        await collectionRef.listDocuments().then(documentRefs => {
            documentRefs.forEach(documentRef => {
                DocumentRefs.push(documentRef.path);
            })
        }).catch(err => console.log("error listing the documents : ", err))

        let orders = 0;
        const promises = DocumentRefs.map(async (documentRef) => {
            const docCollection = db.doc(documentRef).collection('ORDERS');
            const querySnapshot = await docCollection.get();
            querySnapshot.forEach((doc) => {
                orders += 1;
            });
        });
        
        Promise.all(promises)
            .then(() => {
                res.status(200).json({
                    users: users,
                    products: products,
                    messages: messages,
                    orders: orders
                })
            })
            .catch((err) => {
                console.log("Can't read the orders in DB:", err);
                res.status(504).json({
                    status: 504,
                    message: "Some error occurred",
                });
            });
    }
    else{
        res.status(403).json({
            status: 403,
            message: "only GET allowed"
        })
    }
}

export default adminmiddleware(handler)