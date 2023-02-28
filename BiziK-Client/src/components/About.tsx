import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid content">
        <div className="row">
          <div className="col-lg-6">
            <h1>Information about business card?</h1>
            <p>
              Knowing what business card details to add and what to leave out
              helps create a card that’s both eye-catching and well-balanced.
              When designed correctly, your business card reminds people of the
              first time you met and encourages those who are interested in your
              products or services to get back in touch or visit your website
              for more information.With our custom business card printing
              services, you can start designing for free and use our pre-made
              business card designs that already include all the information.
            </p>
            <img className="image img-fluid" src="about2.svg" alt="" />
          </div>
          <div className="col-lg-6">
            <h1>The Front of Your Business Card</h1>
            <p>
              A business card represents two different entities: you and your
              business. Typically, designers separate these two entities when
              creating a card layout. On one side of the card (the “front”),
              you’ll see information about your employer and the work they do.
              On the other side (the “back”), you’ll find specific information
              about you and your job.
            </p>
            <img className="image img-fluid " src="about1.svg" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
