import { assets } from "../assets/assets"
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="dark:text-white flex space-x-3 gap-3 items-center py-5">
        {/* <Image src={assets.code} alt="code" className="w-10 rounded-md"/> */}
        <h2 className="text-xl font-medium tracking-wide ">Powered By Lucas🚀🚀</h2>
    </div>
    
  )
}

export default Logo