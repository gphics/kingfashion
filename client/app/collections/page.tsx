import { resultType, styleObjectType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaNairaSign } from "react-icons/fa6";


async function getStyles(): Promise<resultType> {
  const first = await fetch(`${process.env.SERVER_URL}/styles`);
  const second = await first.json();
  return second;
}

async function CollectionsPage() {
  const result: resultType = await getStyles();
  if (result.err) {
    return (
      <main>
        <h2> {result.err} </h2>
      </main>
    );
  }
  const styles = result.response.data as Array<styleObjectType>;

  
  return (
    <main className="collections-page">
        {styles &&
          styles.map((style: styleObjectType, index: number) => {
            //   @ts-ignore
            return <Each style={style} key={index} />;
          })}
    </main>
  );
}

function Each({ style }: { style: styleObjectType }) {
  const imgSrc = style.images[0].secure_url;
  const name =
    style.name.length > 30 ? `${style.name.slice(0, 30)}...` : style.name;
  const price = style.price;
  const id = style._id;
  return (
    <Link href={`/collections/${id}`} className="each-style">
      <Image alt={name} src={imgSrc} width={200} height={200} />
      <h3> {name} </h3>
      <h3>
        {" "}
        <FaNairaSign className="naira-icon" />
        {price}{" "}
      </h3>
    </Link>
  );
}

export default CollectionsPage;
