import FooterLogo from "../../public/images/svg/w_logo.svg";
import Image from "next/image";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
function FooterComponent() {
  return (
    <div className="footer-component">
      <Image src={FooterLogo} alt="footer logo" />
      <p>Arisekola Shopping Complex Ibadan, Oyo State Nigeria.</p>
      <div className="icons-holder">
        <Link href="https://wa.me/7018010706" target="_blank">
          <FaWhatsappSquare className="icon" />
        </Link>
        <Link href="mailto:usmanabdulhakeem31@gmail.con" target="_blank">
          <IoMdMail className="icon" />
        </Link>
      </div>
    </div>
  );
}

export default FooterComponent;
