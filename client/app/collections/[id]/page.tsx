"use client";
import { StyleSliceAction } from "@/app/slices/styleSlice";
import SlidingGalleryComponent from "@/components/others/SlidingGalleryComponent";
import { styleObjectType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EachStyleInfo from "./EachStyleInfo";
import LoadingComponent from "@/components/others/LoadingComponent";

function EachCollections() {
  const dispatch = useDispatch();
  const { addCurrentStyle } = StyleSliceAction;
  // @ts-ignore
  const { currentStyle }: { currentStyle: styleObjectType } = useSelector(
    (state: any) => state.stylesSliceReducer
  );
  // console.log(currentStyle);
  const { id } = useParams();
  async function getStyles() {
    const first = await fetch(`/collections/deps?id=${id}`);
    const second = await first.json();
    if (second.err) {
      toast.error(second.err);
      return;
    }
    const payload = second.data.response.data;
    dispatch(addCurrentStyle(payload));
  }
  useEffect(() => {
    getStyles();
  }, [id]);
  const imgArr: string[] = currentStyle.images.length
    ? currentStyle.images.map((elem) => elem.secure_url)
    : [];
  if (!currentStyle.name) {
    return (
      <main>
        <LoadingComponent />
      </main>
    );
  }
  return (
    <main>
      <SlidingGalleryComponent imgArr={imgArr} />
      <EachStyleInfo />
    </main>
  );
}

export default EachCollections;
