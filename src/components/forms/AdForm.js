import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export default function AdForm({ action, type }) {
    //context
    const [auth, setAuth] = useAuth();
    // state
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        carpark: "",
        landsize: "",
        title: "",
        description: "",
        loading: false,
        type,
        action,
    });

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            setAd({ ...ad, loading: true });
            const { data } = await axios.post("/ad", ad);
            console.log("ad create response =>", data);
            if (data?.error) {
                toast.error(data.error);
                setAd({ ...ad, loading: false });
            } else {
                //update user in context
                setAuth({ ...auth, user: data.user }); ///?
                const fromLs = JSON.parse(localStorage.getItem("auth")); //?
                fromLs.user = data.user; //?
                localStorage.setItem("auth", JSON.stringify(fromLs)); //?
                toast.success("Ad created successfully");
                setAd({ ...ad, loading: false });
                // navigate("/dashboard");
                window.location.href = "/dashboard";
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="mb3 form-control">
                <ImageUpload ad={ad} setAd={setAd} />
                <GooglePlacesAutocomplete
                    apiKey={GOOGLE_PLACES_KEY}
                    apiOptions="au"
                    selectProps={{
                        defaultInputValue: ad?.address,
                        placeholder: "Search for address...,",
                        onChange: ({ value }) => {
                            setAd({ ...ad, address: value.description });
                        },
                    }}
                />
            </div>
            <div style={{ marginTop: "80px" }}>
                <CurrencyInput
                    placeholder="Enter price"
                    defaultValue={ad.price}
                    className="form-control mb-3"
                    onValueChange={(value) => setAd({ ...ad, price: value })}
                />
            </div>
            {type === "House" ? (
                <>
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Enter how many bedrooms"
                        value={ad.bedrooms}
                        onChange={(e) =>
                            setAd({ ...ad, bedrooms: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Enter how many bathrooms"
                        value={ad.bathrooms}
                        onChange={(e) =>
                            setAd({ ...ad, bathrooms: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Enter how many carparks"
                        value={ad.carpark}
                        onChange={(e) =>
                            setAd({ ...ad, carpark: e.target.value })
                        }
                    />
                </>
            ) : (
                ""
            )}
            <input
                type="text"
                className="form-control"
                placeholder="Size of land"
                value={ad.landsize}
                onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
            />
            <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={ad.title}
                onChange={(e) => setAd({ ...ad, title: e.target.value })}
            />
            <textarea
                className="form-control"
                placeholder="Enter description"
                value={ad.description}
                onChange={(e) => setAd({ ...ad, description: e.target.value })}
            />

            <button
                onClick={handleClick}
                className={`btn btn-primary form-control mb-5 ${
                    ad.loading ? "disabled" : ""
                } `}
                disabled={ad.loading}
            >
                {ad.loading ? "Saving..." : "Submit"}
            </button>
            {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
        </>
    );
}
