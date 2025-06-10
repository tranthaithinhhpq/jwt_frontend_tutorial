import './Register.scss'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const Register = (props) => {

    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");


    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/test-api").then(data => {
            console.log("check data axios: ", data)
        })

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
                            <input type="text" className="form-control" placeholder="enter email address " />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="text" className="form-control" placeholder="enter phone number " />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="enter username " />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="enter password" />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="password" className="form-control" placeholder="re-enter password" />
                        </div>
                        <button className='btn btn-primary'>Register</button>
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