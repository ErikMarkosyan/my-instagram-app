import "./Header.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/slices/searchSlice/searchSlice";
import { selectSearch } from "../../store/slices/searchSlice/searchSlice";

const Header = () => {
  const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="headerContainer">
        <Link to="/main">
          <img
            className="logoName"
            src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
            alt="instagram"
          />
        </Link>
        <span className="arrowDown">
          <IoIosArrowDown />
        </span>
        <span className="searchContainer">
          <input
            className="headerSearch"
            placeholder="Search"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Search")}
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <span className="headerSearchIcon">{searchIcon}</span>
        </span>
        <Navbar className="headerNavbar" />
      </div>
    </div>
  );
};

export default Header;
