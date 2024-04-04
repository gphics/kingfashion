"use client";
import { mgtSliceAction } from "@/app/slices/mgtSlice";
import LoadingComponent from "@/components/others/LoadingComponent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StyleFormComponent from "./deps/StyleFormComponent";

function EachDashboardStyle() {
  const dispatch = useDispatch();
  const { isLoading, currentStyle } = useSelector(
    (state: any) => state.mgtSliceReducer
  );
  const { updateAllCategories, updateCurrentStyle, updateIsLoading } =
    mgtSliceAction;
  const { id } = useParams();
  async function getStyle() {
    dispatch(updateIsLoading(true));
    const first = await fetch(`/mgt/dashboard/${id}/deps?id=${id}`);
    const second = await first.json();

    if (second) {
      const { data, err } = second;
      if (err) {
        toast.error(err);
        return;
      }
      const third = await fetch("/mgt/categories/deps");
      const fourth = await third.json();
      if (fourth) {
        dispatch(updateIsLoading(!true));
        dispatch(updateAllCategories(fourth.data));
        dispatch(updateCurrentStyle(data));
      }
    }
  }
  useEffect(() => {
    getStyle();
  }, [id]);
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className="edit-page">
      <StyleFormComponent />
    </main>
  );
}

export default EachDashboardStyle;
