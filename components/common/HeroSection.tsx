import PrimaryButton from "./PrimaryButton";
import Link from "next/link";

type InfoType = {
  heading: string;
  paragraph: string;
  name?: string;
};

export default function HeroSection({
  heading = "",
  paragraph = "",
  name,
}: InfoType) {
  return (
    <>
      <div>
        <h1 className="font-extrabold  leading-snug text-4xl text-green-700">
          {heading}{" "}
        </h1>

        <p className="my-8 text-lg leading-relaxed text-gray-600 mt-4">
          {paragraph}
        </p>
        <Link href={'/analyze'}>
        <PrimaryButton>Get Started</PrimaryButton>
        </Link>
       
      </div>
    </>
  );
}
