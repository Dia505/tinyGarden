import "../css-files/ForgotPassword.css"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
function ForgotPassword() {
    const [emailError, setEmailError] = useState("");
    const [otpError, setOtpError] = useState("");
    const { register, handleSubmit } = useForm();
    const [otpSent, setOtpSent] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitEmail = async (value: any): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:8080/customer/send-otp", value);

            if (response.data.message === 'OTP Sent') {
                setEnteredEmail(value.email);
                setOtpSent(true);
                setEmailError("");
            }
            else if (response.data.message === 'Email does not exist') {
                setEmailError('*Email does not exist');
            }
            else {
                setEmailError('Error sending OTP');
            }
        }
        catch (error) {
            console.error('Error sending OTP and checking email:', error.message);
            setEmailError('Error sending OTP and checking email');
        }
        finally {
            setIsLoading(false);
        }
    };

    const onSubmitOtp = async (value: any): Promise<void> => {
        try {
            const response = await axios.post("http://localhost:8080/customer/validate-otp", value);

            if (response.data.message === 'Success') {
                setOtpVerified(true);
                setOtpError("");
            }
            else if (response.data.message === 'Unsuccessful') {
                setOtpError('*Incorrect OTP code');
            }
            else {
                setOtpError('Error verifying OTP');
            }
        }
        catch (error) {
            console.error('Error checking otp:', error.message);
            setOtpError('Error checking otp');
        }
    };

    const changePassword = useMutation({
        mutationKey: "CHANGE PASSWORD",
        mutationFn: (requestData: any) => {
            console.log(requestData);
            return axios.post("http://localhost:8080/customer/password-reset", requestData);
        },

        onSuccess: () => {
            alert("Password successfully reset! Please login")
            navigate("/login");
        },
    });

    const onSubmitResetPassword = (value: any): void => {
        changePassword.mutate(value);
    };

    return (
        <>
            <div className={"page-container-forgotP"}>
                <div className={"left-section-forgotP"}>
                    <p className={"tiny-garden-forgotP-responsive"}>The Tiny Garden</p>
                    <img className={"forgotP-img-responsive"} src={"src/assets/register login img.png"}/>

                    <p className={"tiny-garden-forgotP"}>The Tiny Garden</p>
                    <img className={"forgotP-img"} src={"src/assets/login-register.jpeg"}/>
                </div>

                {otpVerified ? (
                    <div className='right-sec-forgotP'>
                        <div className='page-heading-forgotP'>
                            <p className='forgotP-title'>Reset Your Password</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmitResetPassword)}>
                            <div className='reset-password-container'>
                                <div className='reset-input-container'>
                                    <input className='resetP-txtfld' type='password' placeholder='New password' {...register("password")}></input>
                                    <input className='confirm-resetP-txtfld' type='password' placeholder='Confirm password'></input>
                                </div>

                                <button className='reset-password-btn'>Update password</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className='right-sec-forgotP'>
                        <Link to={"/login"}><FontAwesomeIcon icon={faArrowLeft} className='back-btn-forgotP'/></Link>

                        <div className='page-heading-forgotP'>
                            <p className='forgotP-title'>Forgot Password?</p>
                            <p className='forgotP-subtitle'>{otpSent
                                ? "Enter the OTP sent to your email"
                                : "Enter your email address to receive OTP"}</p>
                        </div>

                        {otpSent ? (
                            <form onSubmit={handleSubmit(onSubmitOtp)}>
                                <div className='otp-input-container-forgotP'>
                                    <input className='otp-txtfld-forgotP' placeholder='Enter OTP' {...register("otp")} />
                                    {otpError && <p className='errorOtp-message-forgotP'>{otpError}</p>}
                                    <button className='verify-otp-button'>Verify OTP</button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmitEmail)}>
                                <div className='otp-link-container-forgotP'>
                                    <div className='email-container-forgotP'>
                                        <input className='email-txtfld-forgotP' placeholder='Enter your email address' {...register("email")}></input>
                                        {emailError && <p className='error-message-forgotP'>{emailError}</p>}
                                        {isLoading && <p className='loading-message-forgotP'>Sending OTP...</p>}
                                    </div>

                                    <button className='get-otp-button'>Get OTP</button>
                                </div>
                            </form>
                        )}

                    </div>
                )}
            </div>
        </>
    )
}
export default ForgotPassword;