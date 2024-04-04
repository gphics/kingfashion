import { mgtSliceAction } from "@/app/slices/mgtSlice";
import { categoryType, styleObjectType } from "@/types";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
type propsType = {
  transCategories: string[];
};
function CategoriesSection({ transCategories }: propsType) {
  const dispatch = useDispatch();
  const { updateCurrentStyle } = mgtSliceAction;
  const {
    allCategories,
    currentStyle,
  }: { currentStyle: styleObjectType; allCategories: categoryType[] } =
    useSelector((state: any) => state.mgtSliceReducer);
  function categoryOnChangeHandler(e: any) {
    const { value } = e.target;
    if (value === "choose") {
      return;
    }
    const isExisting = transCategories.some(
      (elem) => elem.toLowerCase() === value.toLowerCase()
    );
    if (isExisting) {
      return;
    }
    const obj = JSON.parse(JSON.stringify(currentStyle));
    const picked = allCategories.find(
      (elem) => elem.name.toLowerCase() === value
    );
    obj.categories.push(picked);
    dispatch(updateCurrentStyle(obj));
  }
  function TimesClickHandler(name: string) {
    const obj: styleObjectType = JSON.parse(JSON.stringify(currentStyle));
    const filt = obj.categories.filter(
      // @ts-ignore
      (elem) => elem.name.toLowerCase() !== name
    );
    //   @ts-ignore
    obj.categories = filt;
    dispatch(updateCurrentStyle(obj));
  }
  return (
    <section className="categories-section each">
      <label htmlFor="categories">categories</label>
      <select
        onChange={categoryOnChangeHandler}
        title="categories"
        name="categories"
        id="categories-input"
      >
        <option value="choose">chooose</option>
        {allCategories.map((elem, index: number) => {
          return (
            <option value={elem.name} key={index}>
              {" "}
              {elem.name}{" "}
            </option>
          );
        })}
      </select>
      <article className="category-display">
        {transCategories.length ?
          transCategories.map((elem, index) => {
            return (
              <h5 key={index}>
                {" "}
                {elem.length < 21 ? elem : `${elem.slice(0,21)}...s`}{" "}
                <FaTimes
                  onClick={() => {
                    TimesClickHandler(elem.toLowerCase());
                  }}
                  className="icon"
                />{" "}
              </h5>
            );
          }):""}
      </article>
    </section>
  );
}

export default CategoriesSection;
