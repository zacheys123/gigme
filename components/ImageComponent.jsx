import Image from "next/image";

export default function AppBgImg({ bgCover }) {
  return (
    <Image
      src={bgCover}
      placeholder="blur"
      alt="background Image"
      size="100vw"
      className="object-cover z-[-1] h-[85vh] absolute w-[100vw] xl:container"
    />
  );
}
