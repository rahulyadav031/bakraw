import { db } from "@/src/util/firebaseadmin"

export default async function handler(req, res){
    if(req.method === "GET"){
        let data = []
        await db.collection('products').get().then(querySnapshot => {
            querySnapshot.forEach((doc, index) => {
                data.push({id: doc.id, data: doc.data()})
            })
        })
        res.status(200).json({
            status: 200,
            message: "data fetched sucuessfully",
            data: data
        })
    }
    else{
        res.status(405).json({
            status: 405,
            message: "only GET allowed"
        })
    }
}