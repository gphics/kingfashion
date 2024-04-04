"use client";

import { mgtSliceAction } from "@/app/slices/mgtSlice";
import LoadingComponent from "@/components/others/LoadingComponent";
import { profileType } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProfilePage() {
  const dispatch = useDispatch();
  const { updateIsLoading, updateProfile, updateSingleProfile } =
    mgtSliceAction;
  const { isLoading, profile }: { profile: profileType; isLoading: boolean } =
    useSelector((state: any) => state.mgtSliceReducer);
  async function getUser() {
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/profile/deps");
    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      dispatch(updateProfile(second.data));
    }
  }
  function onChangeHandler(e: any) {
    const { name, value } = e.target;
    dispatch(updateSingleProfile({ name, value }));
  }
  // @ts-ignore
  const arr: { type: string; name: string; value: string | number }[] = [
    { name: "fullname", value: profile?.fullname, type: "text" },
    { name: "password", value: profile?.password, type: "text" },
    { name: "email", value: profile?.email, type: "email" },
    // @ts-ignore
    { name: "contact", value: profile?.contact, type: "number" },
  ];
  async function submitHandler(e: any) {
    e.preventDefault();
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/profile/deps", {
      method: "PUT",
      body: JSON.stringify({ ...profile }),
    });
    const second = await first.json();
    console.log(second)
    if (second) {
      dispatch(updateIsLoading(!true));
      const { message, err } = second
      if (err) {
        toast.error(err)
      } else {
        toast.success(message)
      }
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className="profile-page">
      <h3>Profile</h3>
      <form onSubmit={submitHandler}>
        {arr.map((elem, index: number) => {
          return (
            <div className="each" key={index}>
              <label htmlFor={elem.name}>{elem.name}</label>
              <input
                title={elem.name}
                onChange={onChangeHandler}
                type={elem.type}
                value={elem.value}
                name={elem.name}
              />
            </div>
          );
        })}
        <button type="submit">submit</button>
      </form>
    </main>
  );
}

export default ProfilePage;
