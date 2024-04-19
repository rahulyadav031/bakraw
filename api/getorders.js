import { query } from "firebase/firestore";
import adminmiddleware from "./adminmiddleware";
import { db } from "@/src/util/firebaseadmin";

async function handler(req, res) {
    if (req.method === "GET") {
        const collectionRef = db.collection('orders');
        const DocumentRefs = [];
        await collectionRef.listDocuments().then(documentRefs => {
            documentRefs.forEach(documentRef => {
                DocumentRefs.push(documentRef.path);
            })
        }).catch(err => console.log("error listing the documents : ", err))

        const orders = [];
        const promises = DocumentRefs.map(async (documentRef) => {
            const docCollection = db.doc(documentRef).collection('ORDERS');
            const querySnapshot = await docCollection.get();
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });
        });

        Promise.all(promises)
            .then(() => {
                res.status(200).json({
                    status: 200,
                    orders: orders,
                });
            })
            .catch((err) => {
                console.log("Can't read the orders in DB:", err);
                res.status(504).json({
                    status: 504,
                    message: "Some error occurred",
                });
            });
    }
    else {
        res.status(405).json({
            status: 405,
            message: "only GET allowed"
        })
    }
}

export default adminmiddleware(handler)