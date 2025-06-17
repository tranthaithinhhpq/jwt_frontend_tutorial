import './Login.scss'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService'

const Login = (props) => {

    let history = useHistory();
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)
    const handleCreateNewAccount = () => {
        history.push("/register");
    }
    const handleLogin = async () => {
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
            toast.error("Please enter your email address or phone number");
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            toast.error("Please enter your password");
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response && response && +response.EC === 0) {
            // success
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data));
            history.push('/users');
            window.location.reload();
            //redux
        }
        if (response && response && +response.EC !== 0) {
            //error
            toast.error(response.EM)

        }
    }
    const handleEnter = (event) => {
        if (event.charCode === 0 && event.code === "Enter") {
            handleLogin();

        }

    }
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            history.push("/");
            window.location.reload();
        }

    }, [])
    return (
        <div className="login-container d-flex align-items-center">
            <div className="container ">
                <div className="row px-3 px-md-0 ">
                    <div className="content-left col-12 d-none col-md-7 d-md-block">
                        <div className='brand'>
                            ĐĂNG NHẬP
                        </div>
                        <div className='brand'>
                            Vui lòng đăng nhập để tiếp tục
                        </div>
                    </div>
                    <div className="content-right col-md-5 col-12 d-flex flex-column gap-3 py-3">

                        <div className='brand text-center'>
                            ĐĂNG NHẬP
                        </div>
                        <div className='form-group'>
                            <label>Email address:</label>
                            <input type="text" className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                                placeholder="enter email or phone number address "
                                value={valueLogin}
                                onChange={(event) => { setValueLogin(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                                placeholder="enter password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                onKeyDown={(event) => handleEnter(event)}
                            />
                        </div>


                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />

                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login