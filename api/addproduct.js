import { addProduct } from "@/src/util/firebaseadmin";
import formidable from "formidable"
import adminmiddleware from "./adminmiddleware";

export const config = {
    api: {
        bodyParser: false,
    },
}

async function handler(req, res) {
    if (req.method === 'POST') {
        const form = formidable({ multiples: false });

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error parsing form data:', err);
                res.status(500).json({
                    status: 500,
                    error: 'Failed to parse form data'
                });
                return;
            }
            else {
                if(fields && files.image && files.image2 && files.image3){
                    const { name, quantity, price, description, category } = fields;
                    const { image, image2, image3 } = files;
                    // console.log(image2.originalFilename, image2.filepath, image2.mimetype)
                    addProduct(name, quantity, price, description, category, image, image2, image3).then(response => {
                        console.log("image added", response);
                        res.status(200).json({
                            status: 200,
                            message: 'product added successfully'
                        });
                    }).catch(err => {
                        console.log("error uploading the image : ", err);
                        res.status(504).json({
                            status: 504,
                            message: "error uploading the product"
                        })
                    })
                }
                else if(fields && files.image && files.image2){
                    const { name, quantity, price, description, category } = fields;
                    const { image, image2 } = files;
                    // console.log(image2.originalFilename, image2.filepath, image2.mimetype)
                    addProduct(name, quantity, price, description, category, image, image2, null).then(response => {
                        console.log("image added", response);
                        res.status(200).json({
                            status: 200,
                            message: 'product added successfully'
                        });
                    }).catch(err => {
                        console.log("error uploading the image : ", err);
                        res.status(504).json({
                            status: 504,
                            message: "error uploading the product"
                        })
                    })
                }
                else if(fields && files.image && files.image3){
                    const { name, quantity, price, description, category } = fields;
                    const { image, image3 } = files;
                    // console.log(image2.originalFilename, image2.filepath, image2.mimetype)
                    addProduct(name, quantity, price, description, category, image, null, image3).then(response => {
                        console.log("image added", response);
                        res.status(200).json({
                            status: 200,
                            message: 'product added successfully'
                        });
                    }).catch(err => {
                        console.log("error uploading the image : ", err);
                        res.status(504).json({
                            status: 504,
                            message: "error uploading the product"
                        })
                    })
                }
                else{
                    const { name, quantity, price, description, category } = fields;
                    const { image } = files;
                    // console.log(image2.originalFilename, image2.filepath, image2.mimetype)
                    addProduct(name, quantity, price, description, category, image, null, null).then(response => {
                        console.log("image added", response);
                        res.status(200).json({
                            status: 200,
                            message: 'product added successfully'
                        });
                    }).catch(err => {
                        console.log("error uploading the image : ", err);
                        res.status(504).json({
                            status: 504,
                            message: "error uploading the product"
                        })
                    })
                }
            }
        });
    }
    else {
        res.status(405).json({
            status: 405,
            error: 'Method Not Allowed'
        });
    }
}

export default adminmiddleware(handler)