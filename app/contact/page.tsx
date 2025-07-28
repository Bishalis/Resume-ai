import PrimaryButton from "@/components/common/PrimaryButton";
export default function ContactPage() {
  return (
    <div className="h-[100vh] flex items-center justify-center  lg:justify-around">
      <div className=" flex gap-x-20 flex-col">
        <h1 className="font-extrabold  leading-snug text-4xl text-blue-700 text-center">
          Feel free to contact us !
        </h1>
        <form
          action=""
          className="flex flex-col gap-10  md:w-[60vh] text-center mt-10 text-shadow-white shadow p-10"
        >
          <input
            name="Name"
            placeholder="Enter your full name"
            className=" rounded-sm p-2 border-b-2 border-gray-200"
          />
          <input name="Email" placeholder="Enter your Email " className="rounded-sm p-2 border-b-2 border-gray-200"/>
          <textarea
            name=""
            id=""
            placeholder="Is there any concerns..."
            className="h-20 p-2 rounded border-2 border-gray-200"
          ></textarea>
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </div>
      <img
        src="/assets/contact.jpg"
        alt="Hero"
        className="hidden md:hidden lg:block w-fit h-[60vh]  transition-transform duration-500 group-hover:scale-105 rounded-sm shadow-blue-500 p-2 "
      />
    </div>
  );
}
