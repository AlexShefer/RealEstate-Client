import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../../components/nav/Sidebar";
import { useAuth } from "../../../context/auth";
import AdCard from "../../../components/cards/UserAdCard";

export default function Enquires() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAds();
    }, [auth.token !== ""]);

    const fetchAds = async () => {
        try {
            const { data } = await axios.get(`/enquires`);
            setAds(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Enquires</h1>
            <Sidebar />

            {!ads?.length ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <h2>
                        Hey{" "}
                        {auth.user?.name
                            ? auth.user?.name
                            : auth.user?.username}
                        , You have not enquired any properties yet.
                    </h2>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 mt-4 mb-4">
                            <p className="text-center">
                                You have enquired {ads?.length} properties
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {ads?.map((ad) => (
                            <AdCard ad={ad} key={ad._id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
