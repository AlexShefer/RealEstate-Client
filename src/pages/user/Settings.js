import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/nav/Sidebar";

export default function Settings() {
    // context
    // state
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.put("/update-password", {
                password,
            });
            if (data?.error) {
                toast.error(data.error);
                setLoading(false);
            } else {
                setLoading(false);
                toast.success("Password updated");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="display-1 bg-primary text-light p-5">Settings</h1>
            <div className="container-fluid">
                <Sidebar />
                <div className="container mt-2">
                    <div className="col-lg-8 offset-lg-2 mb-4 mt-4">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="form-control mb-4"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="btn btn-primary form-control mb-3"
                                disabled={loading}
                            >
                                {loading ? "Processing" : "Update password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
