import { FunctionComponent, useEffect, useState } from "react";
import { errorMsg } from "../services/feedbackService";
import { getUser } from "../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [userProfile, setUserProfile] = useState<any>({
    id: "",
    name: "",
    email: "",
    biz: false,
  });
  useEffect(() => {
    getUser()
      .then((result) => {
        setUserProfile(result.data);
      })
      .catch((err) => {
        errorMsg("Something went Wrong, Try Agian");
      });
  }, []);
  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3">
        <i className="fa-solid fa-user"></i> My Profile
      </h1>
      <div className=" container-fluid content">
        <div className="containerDiv card">
          <img
            src="profile1.svg"
            alt="cookies"
            className="hero-image img-fluid"
          />

          <div className="information">
            <div className="name mt-5 ">{userProfile.name}</div>
            <hr />
            <div className="mb-2">
              <strong>Email: </strong>
              {userProfile.email}
            </div>
            <div className="mb-2">
              <strong>Regular/Business </strong>
              {userProfile.biz ? (
                <span style={{ color: "green" }}>
                  Business <i className="fa-solid fa-square-check"></i>
                </span>
              ) : (
                <span>Regular </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
