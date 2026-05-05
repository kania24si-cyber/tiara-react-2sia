import { AiOutlineLoading } from "react-icons/ai"; 
import { MdOutlineError } from "react-icons/md"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError(false)

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return; 
                }

                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false); 
            });
    }

    const errorInfo = error ? (
        <div className="bg-red-100 mb-4 p-4 text-sm text-red-600 rounded-xl flex items-center">
            <MdOutlineError className="me-2 text-lg" />
            {error}
        </div>
    ) : null
    
    const loadingInfo = loading ? (
        <div className="bg-gray-100 mb-4 p-4 text-sm rounded-xl flex items-center">
            <AiOutlineLoading className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="card-beauty w-full max-w-md p-8 rounded-none">

                {/* TITLE */}
               <h2 className="text-3xl font-poppins font-extrabold text-black mb-6 text-center">
                    Hi, Welcome Back 
                </h2>

                {errorInfo}
                {loadingInfo}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-sm text-black-600 mb-1 block text-left">
                            Email 
                        </label>

                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="input-beauty"
                            placeholder="you@example.com"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-black-600 mb-1 block text-left">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="input-beauty"
                            placeholder="********"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-blue w-full"
                    >
                        Login
                    </button>

                </form>

                {/* EXTRA */}
                <p className="text-sm text-gray-400 mt-6 text-center">
                    Forgot password?{" "}
                    <span className="text-blue-500 cursor-pointer hover:underline">
                        Reset here
                    </span>
                </p>

            </div>
        </div>
    )
}