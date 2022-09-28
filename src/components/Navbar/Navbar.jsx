import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { IoNavigateOutline } from "react-icons/io5";
import { AiOutlineCompass } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { GrHomeRounded, GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUsers } from "../../store/slices/usersSlice/usersSlice";

const Navbar = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  return (
    <div className="navbarDiv">
      <ul className="navbarUl">
        <li>
          <NavLink to="/main">{<GrHomeRounded />}</NavLink>
        </li>
        <li>
          <NavLink to="chat">{<IoNavigateOutline />}</NavLink>
        </li>
        <li>
          <NavLink to="newPost">{<CgAddR />}</NavLink>
        </li>
        <li>{<AiOutlineCompass />}</li>
        <li>{<FiHeart />}</li>
        <li>
          <NavLink to="profile">
            <img
              className="userLogo"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt=""
            />
          </NavLink>
        </li>
        <li
          style={{ display: users.initialUser.id ? "inline" : "none" }}
          onClick={() => dispatch(logout())}
        >
          <NavLink to="/">{<GrLogout />} </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
