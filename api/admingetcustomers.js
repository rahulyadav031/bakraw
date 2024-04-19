import adminmiddleware from "./adminmiddleware";
import { getUsers } from "@/src/util/firebaseadmin";

async function handler(req, res){
    if(req.method === "GET"){
        let users = getUsers();
        users.then(querySnapshot => {
            let usersData = [];
            querySnapshot.forEach(docs => {
                usersData.push({data: docs.data()})
            })
            res.status(200).json({
                status: 200,
                data: usersData
            })
        }).catch(e => {
            res.status(403).json({
                status: 403,
                message: "some error!"
            })
        })
    }
    else{
        res.status(403).json({
            status: 403,
            message: "only GET requests allowed"
        })
    }
}

export default adminmiddleware(handler);