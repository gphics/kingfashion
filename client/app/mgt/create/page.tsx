"use client";
import { useEffect } from "react";
import StyleFormComponent from "../dashboard/[id]/deps/StyleFormComponent";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "@/components/others/LoadingComponent";
import { mgtSliceAction } from "@/app/slices/mgtSlice";

function Create() {
  const { isLoading } = useSelector((state: any) => state.mgtSliceReducer);
  const { updateIsLoading, updateAllCategories } = mgtSliceAction;
  const dispatch = useDispatch();
  async function getAllCategories() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/categories/deps");
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { data } = second;
      dispatch(updateAllCategories(data));
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className="style-create-page">
      <StyleFormComponent basicSubmitUrl="/mgt/create/deps" />
    </main>
  );
}

export default Create;
