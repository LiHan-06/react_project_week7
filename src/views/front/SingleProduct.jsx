import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
    // const location = useLocation();
    // const product = location.state?.productData;
    const { id } = useParams()
    const [product, setProduct] = useState();

    const handleView = async (id) => {
        try {
            const response = await axios.get(
            `${API_BASE}/api/${API_PATH}/product/${id}`
            );
            setProduct(response.data.product);
        } catch (error) {
            alert("載入失敗");
        }
    };
    useEffect(() => {
        handleView(id);
    }, [id]);

    const addCart = async(id,qty=1)=>{
        try {
            const data = {
                product_id: id,
                qty
            }
            const reponse = await axios.post(`${API_BASE}/api/${API_PATH}/cart`,{
                data
            })
            alert('已加入購物車')
        } catch (error) {
            
        }
    }

    return(
        !product ? ( <h2>查無產品</h2> ) : (
        <div className="container mt-3 d-flex justify-content-center">
            <div className="card" style={{width: ' 30rem '}}>
                <img src={product.imageUrl} className="card-img-top product-img" style={{ width: '30rem', height: '30rem', objectFit: 'cover' }} alt={product.title} />
                <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">原價 : {product.origin_price} / {product.unit}</p>
                    <p className="card-text text-danger fs-2">特價 : {product.price} / {product.unit}</p>
                    <button type="button" className="btn btn-outline-danger" onClick={() => addCart(product.id) }>加入購物車</button>
                </div>
            </div>
        </div>)
    )
}

export default SingleProduct;