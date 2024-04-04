import { styleObjectType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import shortDest from "@/utils/shortDest";
import { mgtSliceAction } from "@/app/slices/mgtSlice";
export default function ImageUploadForm() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentStyle }: { currentStyle: styleObjectType } = useSelector(
    (state: any) => state.mgtSliceReducer
  );
  const { updateIsLoading } = mgtSliceAction;
  const [imgFileState, setImgFileState] = useState({ files: "", file: "" });
  const [imgUpdate, setImgUpdate] = useState({ public_id: "" });
  function imageOnChangeHandler(e: any) {
    const file = e.target.files[0];
    setImgFileState({ files: "", file });
  }
  function imagesOnChangeHandler(e: any) {
    const files = e.target.files;
    setImgFileState({ file: "", files });
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    if (!imgFileState.file && !imgFileState.files) {
      toast.warning("choose an image");
      return;
    }
    dispatch(updateIsLoading(true));
    const isUpdate: boolean = !!imgFileState.file;
    const formDataObject = new FormData();
    if (isUpdate) {
      formDataObject.append("file", imgFileState.file);
    } else {
      const files = imgFileState.files;
      for (let x = 0; x < files.length; x++) {
        formDataObject.append("files", files[x]);
      }
    }
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const api: string = isUpdate
      ? `${baseUrl}/styles/update-image?style=${id}&image=${imgUpdate.public_id}`
      : `${baseUrl}/styles/upload-images?style=${id}`;

    const first = await fetch(api, {
      method: isUpdate ? "PUT" : "POST",
      body: formDataObject,
    });
    const second = await first.json();
    const res = shortDest(second);
    if (res) {
      dispatch(updateIsLoading(!true));
      const { message, err } = res;
      if (err) {
        toast.error(err);
      } else {
        toast.success(message);
        router.refresh();
      }
    }
  }

  async function deleteHandler(public_id: string) {
    dispatch(updateIsLoading(true));
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const api = `${baseUrl}/styles/delete-image?style=${id}&image=${public_id}`;
    const first = await fetch(api, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const second = await first.json();
    const res = shortDest(second);
    if (res) {
      dispatch(updateIsLoading(!true));
      const { message, err } = res;
      if (err) {
        toast.error(err);
      } else {
        toast.success(message);
        router.refresh();
      }
    }
  }

  return (
    <form className="st-form style-image-form">
      <div className="input-form-holder">
        <label> {imgUpdate.public_id ? "update" : "upload"} image </label>
        {imgUpdate.public_id ? (
          <input
            title="upload"
            onChange={imageOnChangeHandler}
            type="file"
            name="single-file-input"
            id="single-file-input"
            accept=".jpeg,.jpg,.svg,.webp,.png, .gif"
          />
        ) : (
          <input
            accept=".jpeg,.jpg,.svg,.webp,.png, .gif"
            title="upload"
            onChange={imagesOnChangeHandler}
            type="file"
            multiple
            name="multiple-file-input"
            id="multiple-file-input"
          />
        )}
        <button
          className="img-uploader-submit-btn"
          onClick={submitHandler}
          type="button"
        >
          submit
        </button>
      </div>
      {currentStyle.images.length ? (
        <div className="image-load-list">
          {currentStyle.images.map((elem, index: number) => {
            return (
              <article key={index + 234}>
                <Image
                  onClick={() => {
                    setImgUpdate((prev) => ({
                      ...prev,
                      public_id:
                        elem.public_id === prev.public_id ? "" : elem.public_id,
                    }));
                  }}
                  width={200}
                  height={200}
                  alt={currentStyle.name}
                  src={elem.secure_url}
                  key={index}
                  className={
                    elem.public_id === imgUpdate.public_id
                      ? "each-image active"
                      : "each-image"
                  }
                />
                {imgUpdate.public_id === elem.public_id ? (
                  <MdDeleteForever
                    onClick={() => {
                      deleteHandler(elem.public_id);
                    }}
                    className="icon"
                  />
                ) : (
                  ""
                )}
              </article>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
