import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <footer id="footer" className="">
        <p>
          <a
            className="link"
            href="https://www.linkedin.com/in/ivankuper/"
            target="_blank"
          >
            <i className="socials fab fa-linkedin fa-1x px-2"></i>
          </a>
          <a
            className="link"
            href="https://github.com/IvanKuper"
            target="_blank"
          >
            <i className="socials fab fa-github fa-1x px-2"></i>
          </a>
          <a
            className="link"
            href="https://www.linkedin.com/in/ivankuper/"
            target="_blank"
          >
            <i className="socials fab fa-instagram fa-1x px-2"></i>
          </a>
        </p>

        <p className="mt-1">
          All rights reserved 2022 ©
          <strong>
            <a
              className="link"
              href="https://ivankuper.netlify.app/"
              target="_blank"
            >
              <span className="name"> Ivan Kuper.</span>
            </a>
          </strong>
        </p>
      </footer>
    </>
  );
};

export default Footer;
