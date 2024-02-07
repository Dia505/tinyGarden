import "../css-files/Register.css"
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();

    const saveData = useMutation({
        mutationKey:"SAVEDATA",
        mutationFn:(requestData:any)=> {
            console.log(requestData)
            return axios.post("http://localhost:8080/customer/save-customer-details",requestData)
        },
        onSuccess: () => {
            toast.success('Your account has been created. Please login.');
            navigate("/login");
        }
    })

    const {
        register,
        handleSubmit,
        formState
    } = useForm();

    const { errors } = formState;

    const onSubmit = (values:unknown) => {
        saveData.mutate((values))
    }

    return (
        <>
            <div className={"page-container-reg"}>
                <div className={"left-section-reg"}>
                    <p className={"tiny-garden-reg-responsive"}>The Tiny Garden</p>
                    <img className={"register-img-responsive"} src={"src/assets/register login img.png"}/>

                    <p className={"tiny-garden-reg"}>The Tiny Garden</p>
                    <img className={"register-img"} src={"src/assets/login-register.jpeg"}/>
                </div>
                <div className={"right-section-reg"}>
                    <div className={"page-heading-reg"}>
                        <p className={"title-reg"}>REGISTER</p>
                        <p className={"sub-title-reg"}>Please fill in your details</p>
                    </div>

                    <div className={"user-input-reg"}>
                        <form onSubmit={handleSubmit(onSubmit)} className={"reg-form"}>
                            <input className={"text-name-reg"} placeholder={"Full Name"} {...register("fullName", { required: "*Full name is required" })}/>
                            <p style={{ color: 'purple', fontSize: 11, marginBottom: -15, marginTop: 3 }}>{errors?.fullName?.message}</p>

                            <input className={"text-address-reg"} placeholder={"Full Address"} {...register("address", { required: "*Address is required" })}/>
                            <p style={{ color: 'purple', fontSize: 11, marginBottom: -15, marginTop: 3 }}>{errors?.address?.message}</p>

                            <input className={"text-number-reg"} placeholder={"Mobile number"} {...register("mobileNo", { required: "*Mobile number is required" })}/>
                            <p style={{ color: 'purple', fontSize: 11, marginBottom: -15, marginTop: 3 }}>{errors?.mobileNo?.message}</p>

                            <input className={"text-email-reg"} placeholder={"Email Address"} {...register("email", { required: "*Email address is required" })}/>
                            <p style={{ color: 'purple', fontSize: 11, marginBottom: -15, marginTop: 3 }}>{errors?.email?.message}</p>

                            <div className={"password-fields-reg"}>
                                <input type={"password"} className={"text-password-reg"} placeholder={"Password"} {...register("password", { required: "*Password is required" })}/>
                                <input type={"password"} className={"text-rePassword-reg"} placeholder={"Re-enter your password"}/>
                            </div>
                            <p style={{ color: 'purple', fontSize: 11, marginBottom: -15, marginTop: 3 }}>{errors?.password?.message}</p>

                            <div>
                                <button type={"submit"} className={"create-acc-btn"}>Create Account</button>
                            </div>
                        </form>
                        <div className={"login-option-reg"}>
                            <p>Already have an account?</p>
                            <Link to={"/login"}><p className={"login-btn-reg"}>Login</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;