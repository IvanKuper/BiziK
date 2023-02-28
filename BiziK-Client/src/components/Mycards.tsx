import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { deleteCard, getCardByUserId } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { getBiz } from "../services/userService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MycardsProps {}

const Mycards: FunctionComponent<MycardsProps> = () => {
  const [isBiz, setIsBiz] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);
  const handleDelete = (card: Card) => {
    if (window.confirm(`${card.business_name} will be deleted, are you sure?`))
      deleteCard(card)
        .then(() => {
          setIsChanged(!isChanged);
          successMsg(`${card.business_name} Deleted!`);
        })
        .catch((err) => {
          errorMsg("Something went wrong");
        });
  };
  const [card, setCard] = useState<Card[]>([]);
  useEffect(() => {
    setIsBiz(getBiz());
    getCardByUserId()
      .then((result) => {
        setCard(result.data);
      })
      .catch((err) => {
        errorMsg("Something went wrong");
      });
  }, [isChanged]);
  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3">
        <i className="fa-solid fa-address-card"></i> My BiziK Cards
        <span style={{ color: "#F4A261" }}>
          {" "}
          <br /> [# of cards {card.length}]
        </span>
      </h1>
      <div className="container-fluid _AllCards w-75 mb-5">
        <div className="row allCards">
          {/* Search Input */}
          <div className="input-group mx-auto mb-1 w-75">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-brands fa-searchengin"></i>
            </span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="form-control "
              placeholder="Search Card Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          {card.length ? (
            card
              .filter((card) => {
                return search.toLocaleLowerCase() == ""
                  ? card
                  : card.business_name.toLocaleLowerCase().includes(search);
              })
              .map((card: Card) => {
                return (
                  <div key={card.card_id} className="col-lg-4 card bizCard">
                    <div className="top">
                      <div className="col-lg-11 text-center mx-2">
                        <img
                          src={card.business_image}
                          className="card-img-top mx-auto"
                          alt="Biz Image"
                        />
                      </div>
                      {/* Edit / Delete */}
                      {isBiz ? (
                        <div className="col-lg-0">
                          <div className="">
                            <ul className="menu">
                              <button className="btn btn-dark w-100">
                                <Link className="item" to={`edit/${card._id}`}>
                                  <i className="fa-regular fa-pen-to-square"></i>{" "}
                                </Link>
                              </button>
                              <button className="btn btn-danger w-100">
                                <div
                                  onClick={() => handleDelete(card)}
                                  className="item"
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                </div>
                              </button>
                            </ul>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="card-body overflow">
                      <h3 className="card-title text-center">
                        {card.business_name}
                      </h3>
                      <div className="button mx-auto">
                        <button type="submit" className="btn btn-warning w-50 ">
                          <a
                            href="https://ivankuper.netlify.app/"
                            target="_blank"
                          >
                            Visit Our Website
                          </a>
                        </button>
                      </div>
                      <hr />
                      <div className="card-text mb-1 mt-1 text-center">
                        {card.business_desc}
                      </div>
                      <hr />
                      <div className="card-text mb-1 text-center">
                        {card.business_phone}
                      </div>
                      <hr />
                      <div className="card-text mb-1 text-center">
                        {card.business_adress}
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <>
              <h4 className="text-center mt-5">No Cards Added Yet...</h4>
              <img
                className="image mx-auto img-fluid mt-5"
                src="nocards.png"
                alt=""
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mycards;
