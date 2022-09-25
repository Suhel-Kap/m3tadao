import React, { useState } from "react"
const XMTPContext = React.createContext({
    isXMTPConnected: false,
    setIsXMTPConnected: (isXMTPConnected) => {},
    XMTP: null,
    setXMTP: (client) => {},
})

export const XMTPContextProvider = (props) => {
    const [isXMTPConnected, setIsXMTPConnected] = useState(false)
    const [XMTP, setXMTP] = useState(null)
    return (
        <XMTPContext.Provider
            value={{
                isXMTPConnected: isXMTPConnected,
                setIsXMTPConnected: setIsXMTPConnected,
                XMTP: XMTP,
                setXMTP: setXMTP,
            }}
        >
            {props.children}
        </XMTPContext.Provider>
    )
}

export default XMTPContext
