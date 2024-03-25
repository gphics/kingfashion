"use client";

import cookieStorage from "@/utils/cookieStorage";
import { useDispatch, useSelector } from "react-redux";
import { StyleSliceAction } from "../slices/styleSlice";
import { useEffect, useState } from "react";
import EachCartItem from "./EachCartItem";
import { styleObjectType } from "@/types";

function CartPage() {
  // const [toggle, setToggle] = useState(true);
  const { cartItems } = useSelector((state: any) => state.stylesSliceReducer);
  const dispatch = useDispatch();
  const { updateCartItems } = StyleSliceAction;

  function removeCartItem(id: string) {
    cookieStorage.removeItem(id);
    const filtered = cartItems.filter((elem:styleObjectType) => elem._id !== id)
    
    // @ts-ignore
    dispatch(updateCartItems(filtered));
  }
  async function fetchCartItems() {
    const cartItemsId = cookieStorage.getItems();
    if (!cartItemsId.length) {
      // @ts-ignore
      dispatch(updateCartItems([]));
      return;
    }
    const mappedPromise = cartItemsId.map(async (id) => {
      const first = await fetch(`/cart/deps?id=${id}`, { cache: "no-cache" });
      const second = await first.json();
      // console.log(second)
      const data = second.data.response?.data || null;
      const err = second.data.err || null;
      return { data, err };
    });
    const allPromises = await Promise.allSettled(mappedPromise);
    const payload = allPromises.map((content) => {
      // @ts-ignore
      return content.value.data;
    });
    // @ts-ignore
    dispatch(updateCartItems(payload));
  }
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <main className="cart-page">
      {!cartItems || !cartItems.length ? (
        <h2 className="err-notification">Your cart is empty</h2>
      ) : (
        cartItems.map((elem: styleObjectType, index: number) => {
          // @ts-ignore
          return (
            <EachCartItem
              removeCartItem={removeCartItem}
              key={index}
              item={elem}
            />
          );
        })
      )}
    </main>
  );
}

export default CartPage;
