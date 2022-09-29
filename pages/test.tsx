import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {Layout} from "../components/Layout";

export default function Test(){
    const router = useRouter()
    const add = router.query.address
    console.log(add)
    const [address, setAddress] = useState()
    useEffect(() => {
        if (router.query) {
            setAddress(router.query.address)
        }
    }, [router.query])
    return (
        <Layout>
            <p>{address}</p>
            <p>{add}</p>
        </Layout>
    )
}