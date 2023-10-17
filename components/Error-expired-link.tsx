import Image from "next/image";

import sadDog from "@/assets/images/sadDog.jpg";

export default function ErrorExpiredLink({ error }: { error: string }) {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="my-5">
        <Image
          src={sadDog}
          className="h-40 object-contain"
          alt="Sad Dog Mascot"
        />
        <a
          className="text-xs text-slate-400"
          href="https://www.freepik.com/free-vector/hand-drawn-cartoon-sad-dog-illustration_44649669.htm#fromView=search&term=sad+dog&page=1&position=29&track=ais&regularType=vector"
        >
          Image by pikisuperstar on Freepik
        </a>
      </div>
      <h1 className="text-2xl text-red-600 font-bold mb-2">{error}</h1>
      <p className="text-md">Please send reset link again from app.</p>
    </div>
  );
}
