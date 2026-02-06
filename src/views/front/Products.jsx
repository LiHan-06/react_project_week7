import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {  
        const getProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE}/api/${API_PATH}/products`,)
                setProducts(response.data.products);
            } catch (error) {
                alert(error.message);
            }
        }
        getProducts();
    }, [])

    return(
        <div className="container">
            <div className="row">
                {
                    products.map(product => (
                        <div className="col-md-4 mb-3" key={product.id}>
                            <div className="card">
                                <img src={product.imageUrl} className="card-img-top product-img" style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt={product.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">原價 : {product.origin_price}</small></p>
                                    <p className="card-text text-danger fs-2">特價 : {product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Products;