import './Register.scss'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setErrors] = useState({});
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    const isValidInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const error = {
            email: !email ? 'Email không được để trống' : !emailRegex.test(email) ? 'Email không hợp lệ' : '',
            phone: phone ? '' : 'Phone không được để trống',
            password: password ? '' : 'Mật khẩu không được để trống',
            confirmPassword: confirmPassword !== password ? 'Mật khẩu xác nhận không khớp' : confirmPassword ? '' : 'Vui lòng nhập lại mật khẩu',
        };

        setErrors(error);

        // Kiểm tra nếu không có lỗi nào (tức là tất cả giá trị trong error đều rỗng)
        return Object.values(error).every(msg => msg === '');
    };

    const handleRegister = () => {
        let check = isValidInputs();
        let userData = { email, phone, username, password, confirmPassword };
        console.log("check user data ", userData);
    }

    useEffect(() => {
        // axios.get("http://localhost:8080/api/test-api").then(data => {
        //     console.log("check data axios: ", data)
        // }).catch((err) => console.log(err));

    }, []);



    return (
        <div className="register-container d-flex align-items-center">
            <div className="container ">
                <div className="row px-3 px-md-0 ">
                    <div className="content-left col-12 d-none col-md-7 d-md-block">
                        <div className='brand'>
                            ĐĂNG KÝ
                        </div>
                        <div className='brand'>
                            Vui lòng đăng nhập để tiếp tục
                        </div>
                    </div>
                    <div className="content-right col-md-5 col-12 d-flex flex-column gap-3 py-3">

                        <div className='brand text-center'>
                            ĐĂNG KÝ
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="text" className="form-control" placeholder="enter email address "
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                            {error.email && <label style={{ color: "red" }}>{error.email}</label>}

                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="text" className="form-control" placeholder="enter phone number "
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                            {error.phone && <label style={{ color: "red" }}>{error.phone}</label>}
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="enter username "
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="enter password"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                            {error.password && <p style={{ color: "red" }}>{error.password}</p>}
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="password" className="form-control" placeholder="re-enter password"
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            {error.confirmPassword && <label style={{ color: "red" }}>{error.confirmPassword}</label>}
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already have account. Login ?
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register