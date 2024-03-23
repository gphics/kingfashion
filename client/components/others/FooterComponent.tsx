import FooterLogo from "../../public/images/svg/w_logo.svg";
import Image from "next/image";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
function FooterComponent() {
  return (
    <div className="footer-component">
      <Image src={FooterLogo} alt="footer logo" />
      <p>Arisekola Shopping Complex Ibadan, Oyo State Nigeria.</p>
      <div className="icons-holder">
        <Link href="/">
          <IoMdPhonePortrait className="icon" />
        </Link>
        <Link href="/">
          <FaWhatsappSquare className="icon" />
        </Link>
        <Link href="/">
          <IoMdMail className="icon" />
        </Link>
      </div>
    </div>
  );
}

export default FooterComponent;
