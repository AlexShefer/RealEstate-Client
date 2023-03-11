import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { RxDimensions } from "react-icons/rx";

export default function AdFeatures({ ad }) {
    return (
        <p className="card-text d-flex justify-content-between">
            {ad.bedrooms ? (
                <span>
                    <IoBedOutline /> {ad?.bedrooms}
                </span>
            ) : (
                ""
            )}
            {ad.bathrooms ? (
                <span>
                    <TbBath /> {ad?.bathrooms}
                </span>
            ) : (
                ""
            )}
            {ad.landsize ? (
                <span>
                    <RxDimensions /> {ad?.landsize}
                </span>
            ) : (
                ""
            )}
        </p>
    );
}
