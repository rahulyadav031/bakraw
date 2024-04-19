import bcrypt from "bcrypt";
import { createJWT } from "@/src/util/JwtUtils";

async function preHash(PrePassword) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(PrePassword, saltRounds);
    return hash;
}

async function handler(req, res) {
    const serverSidePasscodeHash = await preHash('Hgm#2023@bakraw');
    const serverSideUsernameHash = await preHash('BAK_RAW');
    console.log(serverSidePasscodeHash, serverSideUsernameHash);
    const password = req.body.password;
    const username = req.body.username;
    console.log(password, username);
    if (req.method === 'POST') {
        const matchPass = bcrypt.compareSync(password, serverSidePasscodeHash);
        const matchUser = bcrypt.compareSync(username, serverSideUsernameHash);

        if (matchPass && matchUser) {
            const payload = {
                username: serverSideUsernameHash,
                password: serverSidePasscodeHash
            }
            const token = createJWT(payload, '2h');
            res.status(200).json({
                status: 200,
                message: "admin authenticated",
                atkn: token
            })
        }
        else {
            res.status(403).json({
                status: 403,
                message: "admin not authenticated"
            })
        }
    }
    else {
        res.status(403).json({
            status: 403,
            message: "only GET request allowed"
        })
    }
}

export default handler;