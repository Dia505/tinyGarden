import "../css-files/Login.css"
import {useState} from "react";
import {Link} from "react-router-dom";
function Login() {
    const[rememberMe, setRememberMe] = useState(false);
    return <>
            <div className={"page-container-login"}>
                <div className={"left-section-login"}>
                    <p className={"tiny-garden-login"}>Tiny Garden</p>
                    <img className={"login-img"} src={"src/assets/register login img.png"}/>
                </div>

                <div className={"right-section-login"}>
                    <div className={"page-heading-login"}>
                        <p className={"title-login"}>LOGIN</p>
                        <p className={"subtitle1-login"}>Welcome back!</p>
                        <p className={"subtitle2-login"}>Please login to  your account</p>
                    </div>

                    <div className={"user-input-login"}>
                        <form className={"login-form"}>
                            <input className={"text-email-login"} placeholder={"Email Address"}/>
                            <input type={"password"} className={"text-password-login"} placeholder={"Password"}/>
                        </form>
                    </div>

                    <div className={"remember-forgot-login-container"}>
                        <div className={"remember-me-container-login"}>
                            <input type='checkbox' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}></input>
                            <label className='remember-login'>Remember me</label>
                        </div>
                        <p className='forgot-password-login'>Forgot password</p>
                    </div>

                    <div className={"login-button-container"}>
                        <button className={"login-btn-login"}>Login</button>
                        <Link to={"/registration"}><button className={"sign-up-login"}>Sing up</button></Link>
                    </div>
                </div>
            </div>
    </>
}
export default Login;