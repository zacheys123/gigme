import Image from "next/image";

export default function AppBgImg({ bgCover }) {
  return (  
    <Image
      src={bgCover}
      width={100}
      height={100}
      alt="background Image"

      className="object-cover z-[-1] h-[85vh] absolute w-[100vw] xl:container"
    />
  );
}
