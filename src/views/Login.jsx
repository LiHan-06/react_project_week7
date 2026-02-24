// 頁面元件通常放在 src/views 目錄下
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useForm } from 'react-hook-form';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login({getProducts,setIsAuth}) {
    // const [formData,setFormData] = useState({
    //         username:'',
    //         password:''
    //     });
    
        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({
            mode:'onChange',
            defaultValues:{
                username:'',
                password:''
            }
        })

    // const handleInputChange = (e) => {
    //     const {name,value} = e.target
    //     setFormData((preData) => ({
    //     ...preData,
    //     [name]:value,
    //     }))
    // }

      //登入功能api
    const onSubmit = async (formData) => {
        try {
        // e.preventDefault();
        const response = await axios.post(`${API_BASE}/admin/signin`,formData);
        console.log(response.data);
        const {token, expired} = response.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
        axios.defaults.headers.common['Authorization'] = token;

        // getProducts();
        // setIsAuth(true);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return(
        <div className="container login">
            <h1 className='mb-3 text-secondary-emphasis'>請先登入</h1>
            <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    name="username" 
                    placeholder="name@example.com" 
                    // value={formData.username} 
                    // onChange={(e) => handleInputChange(e)}
                    {...register('username',{
                        required:'請輸入Email',
                        pattern:{
                            value: /^\S+@\S+$/i,
                            message: "Email 格式不正確",
                        },
                    })}
                />
                <label htmlFor="username">Email address</label>
                {
                    errors.username && (
                        <p className="text-danger">{errors.username.message}</p>
                    )
                }
            </div>
            <div className="form-floating mb-3 outline-success">
                <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Password" 
                    // value={formData.password} 
                    // onChange={(e) => handleInputChange(e)}
                    {...register("password", {
                        required: "請輸入密碼",
                        minLength: {
                            value: 6,
                            message: "密碼長度至少需 6 碼",
                        },
                        })}
                />
                <label htmlFor="password">Password</label>
                {
                    errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                    )
                }
            </div>
            <button type="submit" className="btn btn-outline-secondary w-100">登入</button>
            </form>
        </div>        
    )
}

export default Login;