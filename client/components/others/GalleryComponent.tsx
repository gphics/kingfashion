"use client";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
type arrObject = {
  name: string;
  description: string;
  price: number;
  imgSrc: any;
  id: number;
};
function Gallery({ dataArr }: { dataArr: arrObject[] }) {
  let curSlide = 0;
  const dataArrLength: number = dataArr.length;
  // adding style to active btn
  function btnActiveFunc(cur: null | number) {
    const btns = document.querySelectorAll(".ctrl-btn");
    btns.forEach((elem, index) => {
      elem.classList.remove("active");
      // @ts-ignore
      const forValue: number = +elem.dataset.for;
      if ((index === 0 && cur === null) || forValue === cur) {
        elem.classList.add("active");
      }
    });
  }
  // main slide action function
  function slideAction(slideNumber: null | number) {
    const randomNumber = Math.floor(Math.random() * 2);
    const movementArr = ["translateY", "translateX"];
    const slides = document.querySelectorAll(".slides");
    btnActiveFunc(slideNumber);
    slides.forEach((elem, i) => {
      // @ts-ignore
      elem.style.transform =
        slideNumber === null
          ? `${movementArr[randomNumber]}(${100 * i}%)`
          : `${movementArr[randomNumber]}(${100 * (i - slideNumber)}%)`;
    });
  }
  function initSlider() {
    slideAction(null);

    setInterval(() => {
      curSlide = curSlide === dataArrLength - 1 ? 0 : curSlide + 1;
      slideAction(curSlide);
    }, 10000);
  }

  function ctrlClick(e: any) {
    const targetSlideNumber: number = +e.target.dataset.for;
    if (targetSlideNumber === curSlide) {
      return;
    }
    curSlide = targetSlideNumber;
    slideAction(targetSlideNumber);
  }
  useEffect(() => {
    const galleryComponent = document.querySelector(".gallery-component");
    if (dataArr.length) {
      initSlider();
    }
    setTimeout(() => {
      // @ts-ignore
      galleryComponent?.classList.remove("dim-opacity");
    }, 2000);
  }, [dataArr]);
  return (
    <div className="dim-opacity gallery-component">
      {/* rendering the style info */}
      {dataArr.map(
        ({ id, imgSrc, description, name, price }, index: number) => {
          return (
            <Link
              href={`/collections/${id}`}
              className="slides"
              key={index + id}
            >
              <Image
                width={200}
                height={200}
                quality={100}
                alt={name}
                src={imgSrc}
              />

              <article>
                <h3> {name} </h3>
                <p> {description} </p>
                <h3> ${price} </h3>
              </article>
            </Link>
          );
        }
      )}

      <aside className="control">
        {dataArr.map((elem, index) => {
          return (
            <button
              title="control-btn"
              className="ctrl-btn"
              onClick={ctrlClick}
              key={index}
              data-for={index}
            ></button>
          );
        })}
      </aside>
    </div>
  );
}

export default Gallery;
