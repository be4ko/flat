import React, { createContext, useState } from "react";

export const CounterContext = createContext();


function CounterContextProvider(props){
    const [counter, setCounter] = useState(0)

    function increaseCounter(){
        setCounter(counter +1 )
    }

    return <CounterContext.Provider value={{ counter , increaseCounter }}>
        {props.children}
    </CounterContext.Provider>
}

export default CounterContextProvider;