"use client";
import Image from "next/image";
import { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import DefaultImage from "../../public/images/OTHERS/default-img.png";
function SlidingGalleryComponent({ imgArr }: { imgArr: string[] }) {
  let curSlide = 0;
  const totalImages: number = imgArr.length ? imgArr.length - 1 : 0;

  function slideAction(slide?: number) {
    const arr = ["translateX", "translateY"];
    const rand = Math.floor(Math.random() * 2);
    const styleImg = document.querySelectorAll(".style-img");
    styleImg.forEach((elem: any, index: number) => {
      if (slide || slide === 0) {
        elem.style.transform = `${arr[rand]}(${100 * (index - slide)}%)`;
      } else {
        elem.style.transform = `${arr[rand]}(${100 * index}%)`;
      }
    });
  }
  function nextImg() {
    curSlide = curSlide === totalImages ? 0 : curSlide + 1;
    slideAction(curSlide);
  }
  function prevImg() {
    curSlide = curSlide === 0 ? totalImages : curSlide - 1;
    slideAction(curSlide);
  }
  useEffect(() => {
    imgArr.length && slideAction();
  }, [imgArr]);
  return (
    <div className="sliding-gallery-component">
      <section className="style-images-holder">
        {imgArr.length ? (
          imgArr.map((elem: string, index: number) => {
            return (
              <Image
                className="style-img"
                data-num={index + 1}
                alt="style-image"
                src={elem}
                key={index}
                width={200}
                height={200}
              />
            );
          })
        ) : (
          <Image
            className="style-img"
            alt="style-image"
            src={DefaultImage}
            width={200}
            height={200}
          />
        )}
      </section>
      {imgArr.length ? (
        <section className="controls">
          <FaAngleLeft onClick={prevImg} className="control-btn" />
          <FaAngleRight onClick={nextImg} className="control-btn" />
        </section>
      ) : (
        ""
      )}
    </div>
  );
}

export default SlidingGalleryComponent;
