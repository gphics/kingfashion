"use client";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { mgtSliceAction } from "@/app/slices/mgtSlice";
import LoadingComponent from "@/components/others/LoadingComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { categoryType } from "@/types";
function CategoryPage() {
  const [createState, setCreateState] = useState({
    show: false,
    create: true,
  });
  const {
    currentCategory,
    allCategories,
    isLoading,
    filteredCategories,
    categorySearch,
  } = useSelector((state: any) => state.mgtSliceReducer);
  const {
    updateIsLoading,
    updateAllCategories,
    updateCategorySearch,
    updateFilteredCategories,
    updateCurrentCategory,
  } = mgtSliceAction;
  const dispatch = useDispatch();
  async function getCategories() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/categories/deps");
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { data, err } = second;
      if (err) {
        toast.error(err);
        return;
      }
      dispatch(updateAllCategories(data));
      dispatch(updateFilteredCategories(data));
    }
  }
  function mainChangeHandler(value: string) {
    dispatch(updateCategorySearch(value));
    // const trans = value.to
    const filt = allCategories.filter((elem: any) =>
      elem.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(updateFilteredCategories(filt));
  }
  function inputOnChangeHandler(e: any) {
    mainChangeHandler(e.target.value);
  }
  function searchFormSubmitHandler(e: any) {
    e.preventDefault();
    mainChangeHandler(categorySearch);
  }
  async function categoryCreateSubmit(e: any) {
    e.preventDefault();
    // @ts-ignore
    const value: string = document.querySelector("#category-input").value;
    if (!value) {
      toast.warning("input field is empty");
      return;
    }
    dispatch(updateIsLoading(true));
    const { create } = createState;
    const api = "/mgt/categories/deps";
    const body = create
      ? JSON.stringify({ name: value })
      : JSON.stringify({ name: value, id: currentCategory._id });
    const first = await fetch(api, {
      method: create ? "POST" : "PUT",
      body,
    });
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { err, message } = second;
      if (err) {
        toast.error(err);
        return;
      }
      toast.success(message);
      setCreateState((prev) => ({ ...prev, show: false }));
      getCategories();
    }
  }
  function createInputOnChangeHandler(e: any) {
    const { value } = e.target;
    dispatch(updateCurrentCategory({ name: value }));
  }
  async function categoryDeleteHandler(id: string) {
    dispatch(updateIsLoading(true));
    const first = await fetch(`/mgt/categories/deps?id=${id}`, {
      method: "DELETE",
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
      getCategories();
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className="category-list-page">
      {createState.show ? (
        <section
          onClick={(e: any) => {
            const elem = document.querySelector(".category-create");
            if (e.target === elem) {
              setCreateState((prev) => ({ ...prev, show: false }));
            }
          }}
          className="category-create"
        >
          <form onSubmit={categoryCreateSubmit}>
            <label htmlFor="category-input">name</label>
            <input
              onChange={createInputOnChangeHandler}
              value={currentCategory.name}
              type="text"
              name="category-input"
              id="category-input"
            />
            <button type="button" onClick={categoryCreateSubmit}>
              submit
            </button>
          </form>
        </section>
      ) : (
        ""
      )}

      <header>
        <h3>All Categories</h3>
        <section>
          <button
            className="create-toggle-btn"
            onClick={() => {
              setCreateState((prev) => ({ ...prev, show: !prev.show }));
            }}
            type="button"
          >
            Create
          </button>
          <form onSubmit={searchFormSubmitHandler}>
            <input
              title="category-search"
              value={categorySearch}
              type="text"
              placeholder="enter name ..."
              onChange={inputOnChangeHandler}
            />
            <button onClick={searchFormSubmitHandler} type="button">
              {" "}
              {""} <FaSearch className="icon" />{" "}
            </button>
          </form>
        </section>
      </header>
      <article className="category-list">
        {filteredCategories.length ? (
          filteredCategories.map((elem: categoryType, index: number) => {
            return (
              <div className="each-category" key={index}>
                {" "}
                <h4>{elem.name} </h4>
                <button
                  onClick={() => {
                    setCreateState((prev) => ({
                      show: !prev.show,
                      create: false,
                    }));
                    dispatch(updateCurrentCategory(elem));
                  }}
                  className="category-edit-btn"
                  type="button"
                >
                  {" "}
                  <FaEdit className="icon" />{" "}
                </button>{" "}
                <button
                  onClick={() => {
                    categoryDeleteHandler(elem._id);
                  }}
                  className="category-delete-btn"
                  type="button"
                >
                  {" "}
                  <MdDeleteForever className="icon" />{" "}
                </button>
              </div>
            );
          })
        ) : (
          <h2 className="err-notification">No Category !</h2>
        )}
      </article>
    </main>
  );
}

export default CategoryPage;
