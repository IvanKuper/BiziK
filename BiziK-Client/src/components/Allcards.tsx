import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Card";
import { getAllCards } from "../services/cardService";
import { errorMsg } from "../services/feedbackService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AllcardsProps {}

const Cards: FunctionComponent<AllcardsProps> = () => {
  const [search, setSearch] = useState<string>("");
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards()
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => {
        errorMsg("Something went Wrong, Try Agian");
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center mt-3">
        <i className="fa-solid fa-address-card"></i> All BiziK Cards
        <span style={{ color: "#F4A261" }}>
          {" "}
          <br /> [# of cards {cards.length}]
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
          {cards.length ? (
            cards
              .filter((card) => {
                return search.toLocaleLowerCase() == ""
                  ? card
                  : card.business_name.toLocaleLowerCase().includes(search);
              })
              .map((card: Card) => {
                return (
                  <div key={card.card_id} className="col-lg-4 card bizCard">
                    <div className="top">
                      <div className="col-lg-10 text-center">
                        <img
                          src={card.business_image}
                          className="card-img-top mx-auto"
                          alt="..."
                        />
                      </div>
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
                      <div className="card-text mb-1 text-center">
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
                className="image mx-auto img-fluid"
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

export default Cards;
