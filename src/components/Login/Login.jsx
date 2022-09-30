import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectUsers,
  setInitialUser,
} from "../../store/slices/usersSlice/usersSlice";
import { useNavigate } from "react-router-dom";
import showHide from "../../hoc/showHide";

const Login = ({ toggleShow, show }) => {
  const fbIcon = <FontAwesomeIcon icon={faFacebookSquare} />;
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const navigate = useNavigate();
  const formRef = useRef(null);
  useEffect(() => {
    if (!users.data.length) {
      dispatch(fetchUsers());
    }
  }, []);

  useEffect(() => {
    if (
      (users.initialUser.username === formRef.current[0].value ||
        users.initialUser.email === formRef.current[0].value) &&
      users.initialUser.password === formRef.current[1].value
    ) {
      console.log(users.initialUser);
      navigate("/main");
      formRef.current[0].value = "";
      formRef.current[1].value = "";
    }
  }, [users.initialUser]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      setInitialUser({
        login: formRef.current[0].value,
        password: formRef.current[1].value,
      })
    );
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer1">
          <div className="phonePhoto">
            <img
              src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"
              alt="phoneInsta"
            />
          </div>
        </div>
        <div className="loginContainer2">
          <div className="signUpRegisterContainer">
            <img
              className="loginLogoName"
              src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Black-Logo.wine.svg"
              alt="instagram"
            />
            <div className="loginInputContainer">
              <form ref={formRef} onSubmit={submit}>
                <input
                  className="usernameInput"
                  placeholder="Phone number, username, or email"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) =>
                    (e.target.placeholder = "Phone number, username, or email")
                  }
                  defaultValue={"bret"}
                />
                <input
                  className="passwordInput"
                  placeholder="Password"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Password")}
                  defaultValue={"gwenborough"}
                  type={show ? "text" : "password"}
                />
                <p className="showHidePassword" onClick={toggleShow}>
                  {!show ? "Show" : "Hide"}
                </p>
                <button className="loginButton">Log in</button>
              </form>
              <div className="loginRows">
                <div className="loginRow1"></div>
                <p className="loginOR">OR</p>
                <div className="loginRow2"></div>
              </div>
              <div className="facebookLogin">
                <p>{fbIcon}</p>
              </div>
              <p className="withFacebook">Log in with Facebook</p>
              <p className="forgotPassword">Forgot password?</p>
            </div>
          </div>
          <div className="signUp">
            <p className="alreadyRegistered">Don't have an account?</p>
            <p className="signUP">Sign up</p>
          </div>
          <p className="getTheApp">Get the app.</p>
          <img
            className="appStore"
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
            alt="appstore"
          />
          <img
            className="googlePlay"
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
            alt="googleplay"
          />
        </div>
      </div>
    </>
  );
};

export default showHide(Login);
