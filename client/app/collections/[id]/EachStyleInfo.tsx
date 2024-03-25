"use client"
import { FaNairaSign } from "react-icons/fa6";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import generateWhatsappLink from "../deps/generateWhatsappLink";
import { IoLogoWhatsapp } from "react-icons/io";
// import CartStorage from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import cookieStorage from "@/utils/cookieStorage";
function EachStyleInfo() {
  const styleLocation = window.location.href;
  const router = useRouter();
  // @ts-ignore
  const { currentStyle } = useSelector((state) => state.stylesSliceReducer);
  const { price, name, description, categories, _id } = currentStyle;
  const categoriesLength = categories.length;
  const trans = categories.map((elem: any, i: number) => {
    if (i === categoriesLength - 1) {
      return elem.name;
    } else {
      return `${elem.name} |`;
    }
  });
  const message: string = `
    I would like to get ${name} dress from your website.

    Here's the link: ${styleLocation}
    `;
  function addToCart() {
    const res = cookieStorage.addItem(_id)
    if (res === "done") {
      router.push("/cart");
      return;
    } 
    toast.error(res);
  }
  const whatsappLink: string = generateWhatsappLink(message);
  return (
    <div className="each-style-info">
      <article className="info">
        <h3> {name} </h3>
        <p className="categories">
          {trans.map((elem: string, index: number) => (
            <span key={index}> {elem} </span>
          ))}
        </p>
        <p className="description"> {description} </p>
        <h3>
          {" "}
          <FaNairaSign className="naira-icon" />
          {price}{" "}
        </h3>
      </article>

      <div className="btn-holder">
        <Link className="btn" target="_blank" href={whatsappLink}>
          <IoLogoWhatsapp className="icon" /> Buy Now
        </Link>
        <button type="button" className="btn" onClick={addToCart}>
          {" "}
          <FaShoppingCart className="icon" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default EachStyleInfo;
