import Image from "next/image";
import logo from "../../public/today-logo.png"

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen">
     <Image src={logo} width={300} height={300} alt="logo-image"/>
    </div>
  );
}
