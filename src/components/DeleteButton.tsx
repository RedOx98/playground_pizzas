"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {


  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="">"Loading..."</p>
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method:'DELETE',
    })

    if(res.status === 200) {
      router.push('/menu');
      toast("The product has been deleted successfully!");
      // toast.error(session?.user.email);
      console.log("current user email: "+session?.user.email);
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  console.log("current user email: "+session?.user.email);
  return (
    <button className="bg-red-400 p-2 rounded-full absolute top-4 right-4" onClick={()=>handleDelete(id)}><Image src='/delete.png' alt="" width={20} height={20}/></button>
  )
}

export default DeleteButton