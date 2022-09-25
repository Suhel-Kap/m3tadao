let authenticationToken: string | null = null
export let setAuthenticationToken = (token: string) => {
    authenticationToken = token
    console.log("setAuthenticationToken: token", token)
}

export let getAuthenticationToken = () => {
    return "79f4b3e311224ac80dba400e8606abe60ca5a3000b9ed2b3141e5f6827e93ec9"
}
