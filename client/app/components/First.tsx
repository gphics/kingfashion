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

    const third = second.data.slice(0, 3);

    const payload: galleryObjectType[] = third.map(
      ({ name, _id, description, price, images }: styleObjectType) => {
        return {
          name,
          description,
          price,
          id: _id,
          imgSrc: images[0].secure_url,
        };
      }
    );

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
