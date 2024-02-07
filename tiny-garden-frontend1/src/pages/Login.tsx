import "../css-files/Login.css"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

function Login() {
    const[rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                email,
                password,

            });

            console.log('Response:', response.data);
            const { token, id, status } = response.data;

            if (token) {
                console.log('Login successful!');
                toast.success('You have logged in!');
                navigate('/');
                localStorage.setItem('loggedInUserId', id);
                console.log("Logged in user: ",id)
            }
            else {
                console.log('Login failed');
            }
        }
        catch (err) {
            console.error('Error during login:', err.message);
            if (err.response && err.response.status === 401) {
                setPasswordError("*Password doesn't match with email");
            } else if (err.response && err.response.status === 403) {
                setEmailError("*Invalid email address");
                setPasswordError("*Password doesn't match with email");
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    return <>
            <div className={"page-container-login"}>
                <div className={"left-section-login"}>
                    <p className={"tiny-garden-login-responsive"}>The Tiny Garden</p>
                    <img className={"login-img-responsive"} src={"src/assets/register login img.png"}/>

                    <p className={"tiny-garden-login"}>The Tiny Garden</p>
                    <img className={"login-img"} src={"src/assets/login-register.jpeg"}/>
                </div>

                <div className={"right-section-login"}>
                    <div className={"page-heading-login"}>
                        <p className={"title-login"}>LOGIN</p>
                        <p className={"subtitle1-login"}>Welcome back!</p>
                        <p className={"subtitle2-login"}>Please login to  your account</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className={"user-input-login"}>
                            <div className={"login-email-container"}>
                                <input className={"text-email-login"} placeholder={"Email Address"} value={email} onChange={handleEmailChange}/>
                                {emailError && <p className="error-email">{emailError}</p>}
                            </div>

                            <div className={"login-password-container"}>
                                <input type={"password"} className={"text-password-login"} placeholder={"Password"} value={password} onChange={handlePasswordChange}/>
                                {passwordError && <p className="error-password">{passwordError}</p>}
                            </div>
                        </div>

                        <p className='forgot-password-login'>Forgot password</p>

                        <div className={"login-button-container"}>
                            <button className={"login-btn-login"}>Login</button>
                            <Link to={"/registration"}><button className={"sign-up-login"}>Sign up</button></Link>
                        </div>
                    </form>
                </div>
            </div>
    </>
}
export default Login;