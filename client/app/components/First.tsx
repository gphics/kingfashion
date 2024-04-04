"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StyleSliceAction } from "../slices/styleSlice";
import Gallery from "../../components/others/GalleryComponent";
import Link from "next/link";
import { galleryObjectType, styleObjectType } from "@/types";
import { FaArrowRightLong } from "react-icons/fa6";
import LoadingComponent from "@/components/others/LoadingComponent";
function First() {
  const dispatch = useDispatch();
  const { recentStyles } = useSelector(
    (state: any) => state.stylesSliceReducer
  );
  const { addRecentStyles } = StyleSliceAction;

  async function fetchNewStyles() {
    const first = await fetch("/components");
    const second = await first.json();

    const payload: any[] = [];
    second.data.forEach((elem: styleObjectType, i: number) => {
      if (elem.images[0]?.secure_url && payload.length < 4) {
        const { name, price, description, _id: id, images } = elem;
        const obj = {
          name,
          price,
          description,
          id,
          imgSrc: images[0].secure_url,
        };
        payload.push(obj);
      }
    });

    dispatch(addRecentStyles(payload));
  }

  useEffect(() => {
    fetchNewStyles();
  }, []);
  return (
    <div className="landing-page-first-component">
      <h1>
        {" "}
        <span>Take Your Look Further With</span>
        <span>Our Elegant Fashion Styles</span>{" "}
      </h1>

      {recentStyles ? <Gallery dataArr={recentStyles} /> : <LoadingComponent />}
      <Link href="/collections" className="explore-btn">
        <span>Explore </span> <FaArrowRightLong />
      </Link>
    </div>
  );
}

export default First;
