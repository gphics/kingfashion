"use client";
import { IoSearch } from "react-icons/io5";
import { mgtSliceAction } from "@/app/slices/mgtSlice";
import LoadingComponent from "@/components/others/LoadingComponent";
import { styleObjectType } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Each from "./deps/Each";
import Link from "next/link";

function DashboardPage() {
  const { search, allStyles, filteredStyles, isLoading } = useSelector(
    (state: any) => state.mgtSliceReducer
  );
  const {
    updateSearch,
    updateAllStyles,
    updateFilteredStyles,
    updateIsLoading,
  } = mgtSliceAction;
  const dispatch = useDispatch();

  async function getStyles() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/dashboard/deps");
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { err, data } = second;
      if (err) {
        toast.error(err);
        return;
      }
      dispatch(updateAllStyles(data));
      dispatch(updateFilteredStyles(data));
    }
  }
  function submitHandler(e: any) {
    e.preventDefault();
    filteringHandler(search);
  }
  function filteringHandler(query: string) {
    const transQuery = query.toLowerCase();
    const trans = JSON.parse(JSON.stringify(allStyles));
    const filt = trans.filter((elem: styleObjectType) =>
      elem.name.toLowerCase().includes(transQuery)
    );
    dispatch(updateFilteredStyles(filt));
  }
  async function delClick(id: string) {
    dispatch(updateIsLoading(true));
    const api = `/mgt/dashboard/deps?id=${id}`;
    const first = await fetch(api, { method: "DELETE" });
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { err, message } = second;
      if (err) {
        toast.error(err);
        return;
      }
      toast.success(message);
      getStyles();
    }
  }
  useEffect(() => {
    getStyles();
  }, []);
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className="dashboard-page">
      <h3>All Styles</h3>
      <div className="control">
        <Link href="/mgt/create" className="style-create-btn">
          Create
        </Link>
        <form onSubmit={submitHandler}>
          <input
            onChange={(e: any) => {
              const { value } = e.target;
              dispatch(updateSearch(value));
              filteringHandler(value);
            }}
            placeholder="style name ..."
            title="style-filter"
            type="search"
            name="search-input"
            id="search-input"
            value={search}
          />
          <button title="style-filter" onClick={submitHandler} type="button">
            <IoSearch className="icon" />
          </button>
        </form>
      </div>

      <section className="all-styles">
        {filteredStyles.length ? (
          filteredStyles.map((elem: styleObjectType, index: number) => {
            return <Each delClick={delClick} style={elem} key={index} />;
          })
        ) : (
          <h1 className="err-notification">style Not found !</h1>
        )}
      </section>
    </main>
  );
}

export default DashboardPage;
