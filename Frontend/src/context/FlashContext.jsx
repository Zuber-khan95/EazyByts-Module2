import React, { createContext,useContext,useState,useEffect } from "react";

const FlashContext=createContext();
export const FlashProvider=({children})=>{
const [ flash , setFlash ]=useState({success:"",
    error:""

});

const updateFlash=(currFlash)=>{
    setFlash((prevFlash)=>{return {...prevFlash,...currFlash}});
}

return (
    <FlashContext.Provider value={{ flash , updateFlash }}>
        {children}
    </FlashContext.Provider>
);
};

export const useFlash=()=>{ 
    return useContext(FlashContext);
}