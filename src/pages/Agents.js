import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import UserCard from "../components/cards/UserCard";

export default function Agents() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [agents, setAgents] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const { data } = await axios.get("/agents");
            setAgents(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="display-1">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Agents</h1>
            <div className="container">
                <div className="row">
                    {agents?.map((agent) => (
                        <UserCard user={agent} key={agent._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
