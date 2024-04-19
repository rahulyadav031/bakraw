import adminmiddleware from "./adminmiddleware";
import { db } from "@/src/util/firebaseadmin";
import { storage } from "@/src/util/firebaseadmin";

async function handler(req, res) {
    if (req.method === "POST") {
        const { docId } = req.body;
        const docRef = db.collection('products').doc(docId);
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            res.status(404).json({
                status: 404,
                message: "no product exists"
            })
        }
        else {
            const documentData = docSnapshot.data();

            // Step 2: Extract the array of image URLs
            const imageUrls = documentData.image;

            // Step 3: Delete the document from Firestore
            await docRef.delete();

            for (const imageUrl of imageUrls) {
                // Extract the image filename from the URL
                const filename = imageUrl.split('/').pop();

                // Delete the image from Firebase Storage
                const imageRef = storage.bucket().file('images/' + filename);
                await imageRef.delete();
            }
            res.status(200).json({
                status: 200,
                message: "product deleted successfully"
            })
        }
    }
    else {
        res.status(405).json({
            status: 405,
            message: "only POST allowed"
        })
    }
}

export default adminmiddleware(handler)