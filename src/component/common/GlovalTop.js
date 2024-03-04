import { SiGmail } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";

const GlovalTop = ({ pagename }) => {
  return (
    <div className="gloval-content-top">
      <h2 className="_page_name">{pagename}</h2>
      <div className="contact__">
        <p className="cont">
          <span className="icon">
            <FaPhone />
          </span>
          <span>010-2835-2732</span>
        </p>
        <p className="cont">
          <span className="icon">
            <SiGmail />
          </span>
          <span>tlsgywls1107@gmail.com</span>
        </p>
      </div>
    </div>
  );
};

export default GlovalTop;
