"use client";
import { imageType, styleObjectType } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { FaNairaSign } from "react-icons/fa6";
import generateWhatsappLink from "../collections/deps/generateWhatsappLink";
import DefaultImage from "../../public/images/OTHERS/default-img.png";

type paramType = {
  images: imageType[];
  name: string;
  price: number;
  _id: string;
};
function EachCartItem({
  removeCartItem,
  item,
}: {
  item: styleObjectType;
  removeCartItem: (id: string) => void;
}) {
  const { name, price, _id, images }: paramType = item;
  const styleLocation = window.location.href;
  const message: string = `
    I would like to get ${name} dress from your website.

    Here's the link: ${styleLocation}
    `;

  const whatsappLink: string = generateWhatsappLink(message);

  return (
    <div className="each-cart-item">
      <Image
        width={200}
        height={200}
        alt={name || "item image"}
        src={(images && images[0].secure_url) || DefaultImage}
      />
      <article>
        <h3>
          {" "}
          {name && name.length < 26
            ? `${name}`
            : `${name && name.slice(0, 26)} ...`}{" "}
        </h3>
        <h3>
          {" "}
          <FaNairaSign /> {price}{" "}
        </h3>
        <Link className="cart-btn" href={`/collections/${_id}`}>
          Buy Now
        </Link>
        <button
          className="cart-btn remove"
          onClick={() => {
            removeCartItem(_id);
          }}
          type="button"
        >
          Remove
        </button>
      </article>
    </div>
  );
}

export default EachCartItem;
