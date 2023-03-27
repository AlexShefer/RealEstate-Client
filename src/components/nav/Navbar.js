import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    // context
    const [auth, setAuth] = useAuth();
    // hooks
    const navigate = useNavigate();

    const logout = () => {
        setAuth({ user: null, token: "", refreshToken: "" });
        localStorage.removeItem("auth");
        navigate("/login");
    };

    const loggedIn =
        auth?.user !== null && auth?.token !== "" && auth?.refreshToken !== "";

    const handlePostAdClick = () => {
        if (loggedIn) {
            navigate("/ad/create");
        } else {
            navigate("/login");
        }
    };
    return (
        <nav class="navbar navbar-expand-md bg-body-white p-0">
            <div class="container-fluid">
                <p class="navbar-brand text-primary">PropRent</p>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <NavLink
                            className="nav-link text-primary"
                            aria-current="page"
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            aria-current="page"
                            to="/search"
                        >
                            Search
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            aria-current="page"
                            to="/buy"
                        >
                            Buy
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            aria-current="page"
                            to="/rent"
                        >
                            Rent
                        </NavLink>
                        <NavLink
                            className="nav-link text-primary"
                            aria-current="page"
                            to="/agents"
                        >
                            Agents
                        </NavLink>
                        <a
                            className="nav-link pointer text-primary"
                            onClick={handlePostAdClick}
                        >
                            Post Ad
                        </a>
                        {!loggedIn ? (
                            <>
                                <NavLink
                                    className="nav-link text-primary"
                                    to="/login"
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    className="nav-link text-primary"
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </>
                        ) : (
                            ""
                        )}

                        {loggedIn ? (
                            <div className="dropdown">
                                <li>
                                    <a
                                        className="nav-link dropdown-toggle pointer text-primary"
                                        data-bs-toggle="dropdown"
                                    >
                                        {auth.user.name
                                            ? auth.user.name
                                            : auth.user.username}
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink
                                                className="nav-link text-primary"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a
                                                onClick={logout}
                                                className="nav-link text-primary"
                                            >
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
