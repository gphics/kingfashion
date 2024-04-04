"use client";
import { useDispatch, useSelector } from "react-redux";
import { mgtSliceAction } from "../slices/mgtSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import cookieStorage from "@/utils/cookieStorage";
import LoadingComponent from "@/components/others/LoadingComponent";

function MgtPage() {
  const router = useRouter();
  const { updateLogin, updateIsLoading } = mgtSliceAction;
  const dispatch = useDispatch();
  const { login, isLoading } = useSelector(
    (state: any) => state.mgtSliceReducer
  );
  async function submitHandler(e: any) {
    e.preventDefault();

    const { value } = login;
    if (!value) {
      toast.warn("password must be provided");
      return;
    }
    dispatch(updateIsLoading(true));
    const first = await fetch("/mgt/deps", {
      method: "post",
      body: JSON.stringify({ password: value }),
    });

    const second = await first.json();
    if (second) {
      dispatch(updateIsLoading(!true));
      const { err, data } = second;
      if (err) {
        toast.error(err);
        return;
      }

      cookieStorage.addUser(data);
      router.push("/mgt/dashboard");
    }
  }
  //
  //
  function onChangeHandler(e: any) {
    const { value } = e.target;
    dispatch(updateLogin(value));
  }
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <main className="mgt-login-page">
      <form onSubmit={submitHandler} action="">
        <label htmlFor="password">welcome here !</label>
        <input
          onChange={onChangeHandler}
          id="password"
          value={login.value}
          type="password"
          placeholder="your password"
          title="password"
        />
        <button onClick={submitHandler} type="button">
          login
        </button>
      </form>
    </main>
  );
}

export default MgtPage;
