import { UserProfile, currentUser } from "@clerk/nextjs";
import { json } from "stream/consumers";

const user = await currentUser();

export default function Profile() {
  return (
    <div className="w-full h-full bg-slate-950 flex justify-center items-center">
      <pre className="text-zinc-300"> {JSON.stringify(user, null, 2)} </pre>
    </div>
  );
}
