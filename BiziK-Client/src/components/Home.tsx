import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 my-5 content ">
            <h1 className="big-text mt-1 mb-1">
              Welcome to BiziK, business industry zone by Ivan Kuper.
            </h1>
            <img className="img-fluid mx-1 my-5" src="welcome.svg" alt="" />
            <div className="row">
              <Link
                to={"/signin"}
                className="col-lg-3 btn btn-warning w-100 my-1"
              >
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Link>
              <Link
                to={"/signup"}
                className="col-lg-3 btn btn-warning my-1 w-100"
              >
                <i className="fa-solid fa-registered"></i> Register
              </Link>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="container my-5">
              <h1 className="text-center my-3">
                <span>About this Website</span>
              </h1>
              <div className="row">
                <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center my-3">
                  <img src="Profile.jpg" width="200" />
                  <div></div>
                </div>
                <div className="col-lg-12 fs-5">
                  <p>
                    Hi. My name is Ivan Kuper and this Website is a project for
                    my Fullstack course in HackerU college.
                  </p>

                  <p>
                    <span className="text-dark">Includes:</span>
                  </p>
                  <ul>
                    <li>User Authentication</li>
                    <li>API Service</li>
                    <li>
                      CRUD Operations that can be performed on business Cards
                    </li>
                  </ul>
                  <h3> Technologies used:</h3>
                  <p className="d-flex justify-content-around align-items-center flex-wrap">
                    <img src="react.png" width="60" />
                    <img src="typescript.png" width="60" />
                    <img src="html5.png" width="60" />
                    <img src="css3.png" width="60" />
                    <img src="javascript.png" width="60" />
                    <img src="node.png" width="60" />
                    <img src="bootstrap.png" width="60" />
                    <img src="Mongo.png" width="60" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
