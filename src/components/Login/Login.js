import './Login.scss'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    let history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register");
    }
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
                            <input type="text" className="form-control" placeholder="enter email address " />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>


                        <button className='btn btn-primary'>Login</button>
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