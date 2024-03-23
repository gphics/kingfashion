"use client";
import { styleObjectType } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CollectionsPage() {
  const dispatch = useDispatch();
  // @ts-ignore
  const { styles } = useSelector((state) => state.stylesSliceReducer);
  async function getStyles() {
    const first = await fetch("/collections", { cache:""});
    console.log(first)
    const second = await first.json();
    console.log(second);
  }
  useEffect(() => {
    getStyles();
  }, []);
  return <main className="collections-page"></main>;
}

function Each({ style }: { style: styleObjectType }) {
  console.log(style);
  return <div className="each-style">{/* {style.name} */}</div>;
}

export default CollectionsPage;
