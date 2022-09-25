const { Web3Storage, File } = require("web3.storage")

export const uploadFileToIpfs = async (file, name) => {
    const files = [new File([file], name)]
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })

    const cid = await client.put(files)
    return cid
}

export const uploadJsonToIpfs = async (jsonObject, name="json") => {
    const buffer = Buffer.from(JSON.stringify(jsonObject))
    const files = [new File([buffer], name)]
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN })

    const cid = await client.put(files)
    return cid
}
