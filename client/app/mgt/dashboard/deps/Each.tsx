"use client"
import { styleObjectType } from "@/types";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function Each({
  style,
  delClick,
}: {
  style: styleObjectType;
  delClick: (id: string) => void;
}) {
  const { name, _id } = style;
  const router = useRouter();
  function editClick() {
    router.push(`/mgt/dashboard/${_id}`);
  }

  return (
    <article>
      <h4> {name.length < 26 ? `${name}` : `${name.slice(0, 27)}...`} </h4>
      <button onClick={editClick} className="edit" type="button">
        {" "}
        <FaEdit className="icon" />
      </button>
      <button
        onClick={() => {
          delClick(_id);
        }}
        className="del"
        type="button"
      >
        {" "}
        <MdDeleteForever className="icon" />
      </button>{" "}
    </article>
  );
}

export default Each;
