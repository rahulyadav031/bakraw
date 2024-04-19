import React from 'react'
import Product from '@/components/product/Product'
import { useRouter } from 'next/router'

function ProductPage() {
    const router = useRouter();
    const id = router.query.id;
    const [products, setProducts] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [loaded, setLoaded] = React.useState(false);
    const [prodData, setProdData] = React.useState(null);


    React.useEffect(() => {
        fetch("/api/getproducts")
            .then(res => res.json())
            .then(prod => {
                setProducts(prod.data);
                console.log("st",prod);

                setLoaded(true);
            })
            .catch(err => { console.log("error", err) });
    }, [])

    React.useEffect(() => {
        let p = products.filter(p => p.id == id)
        if (p.length >= 1) {
            // { name, description, id, price, image, weight, category, inStock, numItems,onNumItemChange = null }
            let data = {};
            data.id = p[0].id;
            data.name = p[0].data.name;
            data.description = p[0].data.description;
            data.price = p[0].data.price;
            data.image1 = p[0].data.image[0];
            data.image2 = p[0].data.image[1];
            data.image3 = p[0].data.image[2];
            data.weight = p[0].data.quantity;
            data.category = p[0].data.category;
            data.inStock = p[0].data.inStock;
            setProdData(data);
            console.log(data);
        }

    }, [products])


    return (
        prodData ?
            <Product id={id} {...prodData} /> : null
    )
}

export default ProductPage
