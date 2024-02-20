"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
function page() {
  const router = useRouter();
  const [data, setData] = useState("nothing")
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");


    } catch (error: any) {
        
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails= async ()=>{
    const res = await axios.get('/api/users/me')
     console.log(res.data);
     setData(res.data.data._id)
     
  }

  return (
    <div>
      <h1>Profile</h1>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
      >
        logout
      </button>
      <button
        onClick={getUserDetails}
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
      >
        getUserDetails
      </button>
    </div>
  );
}

export default page;
