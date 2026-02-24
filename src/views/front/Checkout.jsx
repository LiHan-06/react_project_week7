    import { useState,useEffect } from "react";
    import axios from "axios";

    import { currency } from '../../utils/filter';
import { useForm } from "react-hook-form";


    const API_BASE = import.meta.env.VITE_API_BASE;
    const API_PATH = import.meta.env.VITE_API_PATH;

    function Checkout() {
        const [cart, setCart] = useState([]);

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            mode: 'onChange'
        })

        useEffect(()=>{
            const getCart = async()=>{
                try {
                    const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
                    setCart(response.data.data);
                } catch (error) {
                    
                }
            }
            getCart();
        },[])

        const updataCart = async(cartId, productId, qty=1)=>{
            try {
                const data = {
                    product_id: productId,
                    qty
                }
                const response = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`,{data})

                const response2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
                    setCart(response2.data.data);
            } catch (error) {
                alert('更新購物車失敗')
            }
        }

        const delCart = async(cartId)=>{
            try {
                const response = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`,)
                const response2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
                    setCart(response2.data.data);
            } catch (error) {
                alert('刪除商品失敗')
            }
        }

        const onSubmit = async (formData) => {
            try {
                const data ={
                    user: formData,
                    message: formData.message,
                };
                const response = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
                    data
                });
                const response2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
                setCart(response2.data.data);
                alert('已建立訂單');
            } catch (error) {
                
            }
        }

        return(
            <div className="container">
                <h2>購物車列表</h2>
                <div className="text-end mt-4">
                    <button type="button" className="btn btn-outline-danger">
                    清空購物車
                    </button>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">品名</th>
                        <th scope="col">數量/單位</th>
                        <th scope="col">小計</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.carts?.map(cartItem =>(
                                <tr key={cartItem.id}>
                                    <td>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>delCart(cartItem.id)}>
                                        刪除
                                    </button>
                                    </td>
                                    <th scope="row">
                                        {
                                            cartItem.product.title
                                        }
                                    </th>
                                    <td>
                                        <div className="input-group input-group-sm mb-3">
                                            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" defaultValue={cartItem.qty} onChange={(e)=>updataCart(cartItem.id, cartItem.product_id, Number(e.target.value))}/>
                                            <span className="input-group-text" id="inputGroup-sizing-sm">{cartItem.product.unit}</span>
                                            </div>
                                    </td>
                                    <td className="text-end">{currency(cartItem.final_total)}</td>
                                </tr>
                            ))
                        }
                    
                    </tbody>
                    <tfoot>
                    <tr>
                        <td className="text-end" colSpan="3">
                        總計
                        </td>
                        <td className="text-end">{currency(cart.final_total)}</td>
                    </tr>
                    </tfoot>
                </table>

                {/* 結帳 */}
                <div className="my-5 row justify-content-center">
                <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="請輸入 Email"
                        {...register('email',{
                            required: '請輸入 Email',
                            pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email 格式不正確",
                        },
                    })}
                    />
                    {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                    )}
                    </div>

                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        收件人姓名
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="請輸入姓名"
                        {...register('name',{
                            required: '請輸入姓名',
                            minLength:{
                                value: 2,
                                message: '姓名至少需要 2 個字',
                            }
                        })}
                    />
                    {errors.name && (
                        <p className="text-danger">{errors.name.message}</p>
                    )}
                    </div>

                    <div className="mb-3">
                    <label htmlFor="tel" className="form-label">
                        收件人電話
                    </label>
                    <input
                        id="tel"
                        name="tel"
                        type="tel"
                        className="form-control"
                        placeholder="請輸入電話"
                        {...register('tel',{
                            required: '請輸入電話',
                            pattern: {
                                value: /^\d+$/,
                                message: '電話格式不正確',
                            },
                            minLength:{
                                value: 8,
                                message: '電話至少需要 8 個數字',
                            }
                        })}
                    />
                    {errors.tel && (
                        <p className="text-danger">{errors.tel.message}</p>
                    )}
                    </div>

                    <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        收件人地址
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="請輸入地址"
                        {...register('address',{
                            required: '請輸入收件地址',
                        })}
                    />
                    {errors.address && (
                        <p className="text-danger">{errors.address.message}</p>
                    )}
                    </div>

                    <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        留言
                    </label>
                    <textarea
                        id="message"
                        className="form-control"
                        cols="30"
                        rows="10"
                        {...register('message')}
                    ></textarea>
                    </div>
                    <div className="text-end">
                    <button type="submit" className="btn btn-danger">
                        送出訂單
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )
    }

    export default Checkout;