import PrimaryButton from "./PrimaryButton";

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
        <h1 className="font-extrabold  leading-snug text-4xl text-blue-700">
          {heading}{" "}
        </h1>

        <p className="my-8 text-lg leading-relaxed text-gray-600 mt-4">
          {paragraph}
        </p>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </>
  );
}
