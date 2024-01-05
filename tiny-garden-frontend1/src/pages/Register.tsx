import "../css-files/Register.css"
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import axios from "axios";

function Register() {
    const saveData = useMutation({
        mutationKey:"SAVEDATA",
        mutationFn:(requestData:any)=> {
            console.log(requestData)
            return axios.post("http://localhost:8080/customer/save-customer-details",requestData)
        }
    })

    const {
        register,
        handleSubmit,
        formState
    } = useForm();

    const onSubmit = (values:unknown) => {
        saveData.mutate((values))
    }

    return (
        <>
            <div className={"page-container-reg"}>
                <div className={"left-section-reg"}>
                    <p className={"tiny-garden-reg"}>Tiny Garden</p>
                    <img className={"register-img"} src={"src/assets/register login img.png"}/>
                </div>
                <div className={"right-section-reg"}>
                    <div className={"page-heading-reg"}>
                        <p className={"title-reg"}>REGISTER</p>
                        <p className={"sub-title-reg"}>Please fill in your details</p>
                    </div>

                    <div className={"user-input-reg"}>
                        <form onSubmit={handleSubmit(onSubmit)} className={"reg-form"}>
                            <input className={"text-name-reg"} placeholder={"Full Name"} {...register("fullName")}/>
                            <input className={"text-address-reg"} placeholder={"Full Address"} {...register("address")}/>
                            <input className={"text-number-reg"} placeholder={"Mobile number"} {...register("mobileNo")}/>
                            <input className={"text-email-reg"} placeholder={"Email Address"} {...register("email")}/>
                            <div className={"password-fields-reg"}>
                                <input type={"password"} className={"text-password-reg"} placeholder={"Password"} {...register("password")}/>
                                <input type={"password"} className={"text-rePassword-reg"} placeholder={"Re-enter your password"}/>
                            </div>
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