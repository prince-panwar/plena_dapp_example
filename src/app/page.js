'use client'
import dynamic from "next/dynamic";
const ClientSideComponent = dynamic(()=> import("./ClientSideComponent.js"), { ssr: false });
export default function Home() {
 

  
  return (
    <>
    <ClientSideComponent/> 
    </>
  );
}
