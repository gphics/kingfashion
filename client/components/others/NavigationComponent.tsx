"use client";
import Link from "next/link";
import PurpleLogo from "../../public/images/svg/p_logo.svg";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";
import cookieStorage from "@/utils/cookieStorage";
function NavigationComponent() {
  const auth = cookieStorage.getUser()
  // creating each link type
  type linkArrType = {
    name: string;
    href: string;
  };
  // links array
  let linkArr: linkArrType[] = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    // { name: "Contact", href: "/contact" },
    { name: "Cart", href: "/cart" },
  ];
  const mgtLinkArr: linkArrType[] = [
    { name: "Dashboard", href: "/mgt/dashboard" },
    { name: "login", href: "/mgt" },
    { name: "categories", href: "/mgt/categories" },
    { name: "profile", href: "/mgt/profile" },
    { name: "logout", href: "/mgt/logout" },
  ];
  // getting the current path
  const activeLink = usePathname();
  const mgtState: boolean = activeLink.includes("/mgt");
  if (auth) {
    linkArr = [...mgtLinkArr, ...linkArr];
  }
  const [navState, setNavState] = useState(false);
  // toggling nav menu
  function btnClickHandler() {
    const elem = document.querySelector(".nav-link-holder");
    elem?.classList.toggle("hide");
    setNavState((prev) => !prev);
  }
  return (
    <div className="navigation-component">
      <Link href="/" className="logo-holder">
        <Image
          priority
          className="logo"
          alt="king fashion logo"
          src={PurpleLogo}
        />
      </Link>
      <button className="nav-btn" type="button">
        {" "}
        {navState ? (
          <FaTimes onClick={btnClickHandler} className="icon" />
        ) : (
          <CiMenuBurger onClick={btnClickHandler} className="icon" />
        )}{" "}
      </button>
      <section className="hide nav-link-holder">
        {linkArr.map(({ name, href }: linkArrType, index: number) => (
          <Link
            onClick={btnClickHandler}
            className={
              href === activeLink ? "each-nav-link active" : "each-nav-link"
            }
            key={index}
            href={href}
          >
            {" "}
            {name}{" "}
          </Link>
        ))}
      </section>
    </div>
  );
}

export default NavigationComponent;
