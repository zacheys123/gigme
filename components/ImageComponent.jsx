import Image from "next/image";

export default function AppBgImg({ bgCover }) {
  return (  
    <Image
      src={bgCover}
      width={100}
      height={100}
      alt="background Image"

      className="object-cover -z-[0] h-[85vh] absolute w-[100vw] xl:container opacity-10"
    />
  );
}
