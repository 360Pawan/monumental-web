import Image from "next/image";

import thumbsUp from "@/assets/images/thumbsUp.png";

export default function PasswordSuccessPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
       <Image
        src={thumbsUp}
        className="h-40 object-contain"
        alt="Happy Dog Mascot - Dog With Thumbs Up@clipartmax.com"
      />
      <h1 className="mt-5 text-2xl text-green-600 font-bold mb-2">
        Password updated
      </h1>
      <p className="text-md">
        Now login using your new password in Monumental app.
      </p>
    </div>
  );
}
