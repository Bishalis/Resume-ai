type ImageType = {
  imageUrl: string;
};

export default function HeroSection({ imageUrl = "" }: ImageType) {
  return (
    <>
      <div className="relative group rounded-2xl bg-gradient-to-br from-cyan-400 via-green-500 to-purple-600 p-1.5 shadow-lg">
        <img
          src={imageUrl}
          alt="Hero"
          className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </>
  );
}
