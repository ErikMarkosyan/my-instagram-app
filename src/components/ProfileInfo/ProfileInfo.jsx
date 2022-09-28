import { useSelector } from "react-redux";
import { selectUsers } from "../../store/slices/usersSlice/usersSlice";
import { BsGearWide } from "react-icons/bs";
import "./ProfileInfo.css"

const ProfileInfo = () => {
  const { initialUser } = useSelector(selectUsers);
  console.log(initialUser);
  return (
    <div className="profileInfo">
      <p className="username">{initialUser.username}</p>
      <div className="usernameTools">
        <button className="editProfileButton">Edit Profile</button>
        <p className="gear">
          <BsGearWide />
        </p>
      </div>
      <div className="activeInfo">
        <p className="p1">
          <b>{initialUser.posts?.length}</b> posts
        </p>
        <p className="p2">
          <b>200</b> followers
        </p>
        <p className="p3">
          <b>34</b> following
        </p>
      </div>
      <div className="bio">
        <h3 className="nameSurname">{initialUser.name}</h3>
        <p className="desc">{initialUser.about}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
