"use client";

import { useEffect, useState } from "react";

const ScrollHook = (threshold = 10) => {

    const [scrolling, setScrolling] = useState(false);

    useEffect(()=>{

        const handleScroll = ()=>{
            if(window.scrollY > threshold){
                setScrolling(true)
            }
            else{
                setScrolling(false)
            }
        }
        window.addEventListener("scroll",handleScroll);

        return () => {
            window.removeEventListener("scroll",handleScroll);
        }
    })

    return scrolling;
}
 
export default ScrollHook;