import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Navbar({ leftNav, rightNav }){
    return(
        <>
            <MdKeyboardArrowLeft onClick={leftNav} className="border border-white text-white text-6xl"/>

            <MdKeyboardArrowDown className="border border-white text-white text-6xl"/>
            
            <MdKeyboardArrowRight onClick={rightNav} className="border border-white text-white text-6xl"/>
        </>
    )
}