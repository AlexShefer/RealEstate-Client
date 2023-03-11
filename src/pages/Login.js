import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    //hooks
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/login`, {
                email,
                password,
            });
            if (data?.error) {
                toast.error(data.error);
                setLoading(false);
            } else {
                setAuth(data);
                localStorage.setItem("auth", JSON.stringify(data));
                toast.success("Login successful");
                setLoading(false);
                location?.state != null
                    ? navigate(location.state)
                    : navigate("/dashboard");
            }
            console.log(data);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Try it again.");
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Login</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="form-control mb-4"
                                required
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-control mb-4 "
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="btn btn-primary col-12 mb-4"
                                disabled={loading}
                            >
                                {loading ? "Waiting..." : "Login"}
                            </button>
                        </form>
                        <Link
                            className="text-danger"
                            to="/auth/forgot-password"
                        >
                            Forgot Password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
