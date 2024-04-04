import { mgtSliceAction } from "@/app/slices/mgtSlice";
import {  styleObjectType } from "@/types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Basic from "./components/Basic";
import CategoriesSection from "./components/CategoriesSection";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ImageUploadForm from "./components/ImageUploadForm";

type propsType = {
  basicSubmitUrl?: string;
  imgSubmitUrl?: string;
};
function StyleFormComponent({ basicSubmitUrl, imgSubmitUrl }: propsType) {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(2);
  const { currentStyle }: { currentStyle: styleObjectType } = useSelector(
    (state: any) => state.mgtSliceReducer
  );
  const { name, price, description, categories, images } = currentStyle;
  const arr = [
    { name: "name", value: name, type: "text" },
    { name: "price", value: price, type: "number" },
  ];
  // @ts-ignore
  const transCategories: string[] = categories.map((elem) => elem.name);
  const { updateCurrentStyleContent, updateIsLoading } = mgtSliceAction;
  const dispatch = useDispatch();
  function basicUpdateHandler(e: any) {
    const { value, name } = e.target;
    dispatch(updateCurrentStyleContent({ name, value }));
  }
  async function styleInfoSubmitHandler(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const api: string =
      basicSubmitUrl || `/mgt/dashboard/${currentStyle._id}/deps`;
    const method = basicSubmitUrl ? "POST" : "PUT";
    const first = await fetch(api, {
      method,
      body: JSON.stringify(currentStyle),
    });
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { message, err } = second;
      if (err) {
        toast.error(err);
        return;
      }
      toast.success(message);
      if (basicSubmitUrl) {
        router.push("/mgt/dashboard");
      }
    }
  }
  return (
    <div className="style-form-component">
      {currentForm === 1 ? (
        <form
          onSubmit={styleInfoSubmitHandler}
          className="st-form style-info-form"
        >
          <h3 className="heading-info">Basic Information</h3>
          {/* basic form section start */}
          <Basic
            arr={arr}
            basicUpdateHandler={basicUpdateHandler}
            description={description}
          />
          {/* basic form section end */}
          {/* Category section start */}
          <CategoriesSection transCategories={transCategories} />
          {/* Category section end */}
          <button
            className="submit-btn"
            onClick={styleInfoSubmitHandler}
            type="button"
          >
            submit
          </button>
        </form>
      ) : (
        <ImageUploadForm />
      )}
      <div className="current-form-control">
        {currentForm === 1 ? (
          <button
            onClick={() => {
              setCurrentForm(2);
            }}
            type="button"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              setCurrentForm(1);
            }}
            type="button"
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
}


export default StyleFormComponent;
