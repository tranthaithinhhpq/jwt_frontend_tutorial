import './Login.scss'
const Login = (props) => {
    return (
        <div className="login-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="content-left col-7">
                        <div className='brand'>
                            BỆNH VIỆN ĐA KHOA TÂN HƯNG
                        </div>
                        <div className='brand'>
                            TAN HUNG GENERAL HOSPITAL
                        </div>
                    </div>
                    <div className="content-right col-5 d-flex flex-column gap-3 py-3">
                        <input type="text" className="form-control" placeholder="enter email address " />
                        <input type="password" className="form-control" placeholder="Password" />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>Forgot your password?</span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new account</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login