import { ethers, Wallet } from "ethers"
import { contractAddresses, m3taDaoAbi, lensAbi } from "../constants"
import { useAccount, useSigner, useSignTypedData } from "wagmi"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../utils/uploadToIpfs"
import { graphql } from "@valist/sdk"
import { createPost } from "../constants/graphql/queries"
import { v4 as uuidv4 } from "uuid"
import { useEffect } from "react"
import {
    ApolloClient,
    ApolloLink,
    DefaultOptions,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client/core"

import { onError } from "@apollo/client/link/error"
import fetch from "cross-fetch"
import { useSession } from "next-auth/react"

const isJsonEmpty = (jsonObj) => {
    return (
        jsonObj &&
        Object.keys(jsonObj).length === 0 &&
        Object.getPrototypeOf(jsonObj) === Object.prototype
    )
}

const CreatePostTypedDataDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "mutation",
            name: { kind: "Name", value: "createPostTypedData" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: { kind: "Variable", name: { kind: "Name", value: "request" } },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "CreatePublicPostRequest" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "createPostTypedData" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "request" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "request" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                { kind: "Field", name: { kind: "Name", value: "id" } },
                                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "typedData" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: { kind: "Name", value: "types" },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "PostWithSig",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "type",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: { kind: "Name", value: "domain" },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: { kind: "Name", value: "name" },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "chainId",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "version",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "verifyingContract",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: { kind: "Name", value: "value" },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: { kind: "Name", value: "nonce" },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "deadline",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "profileId",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "contentURI",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "collectModule",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "collectModuleInitData",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "referenceModule",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "referenceModuleInitData",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
}

const useLens = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const { address } = useAccount()

    const createLensPost = async (
        profileId, // lens profHex
        name,
        image,
        description,
        tags
    ) => {
        let imageURI
        if (image) {
            imageURI = await uploadFileToIpfs(image, "image")
        } else {
            imageURI = ""
        }

        const ipfsResult = await uploadJsonToIpfs({
            version: "1.0.0",
            mainContentFocus: "TEXT_ONLY",
            metadata_id: uuidv4(),
            description: description,
            locale: "en-US",
            content: "Content",
            external_url: null,
            image: imageURI,
            imageMimeType: null,
            name: name,
            attributes: [],
            tags: tags,
            appId: "m3tadao.eth",
        })
        //   console.log('create post: ipfs result', ipfsResult);

        // hard coded to make the code example clear
        const createPostRequest = {
            profileId,
            contentURI: ipfsResult,
            collectModule: {
                // feeCollectModule: {
                //   amount: {
                //     currency: currencies.enabledModuleCurrencies.map(
                //       (c: any) => c.address
                //     )[0],
                //     value: '0.000001',
                //   },
                //   recipient: address,
                //   referralFee: 10.5,
                // },
                // revertCollectModule: true,
                freeCollectModule: { followerOnly: true },
                // limitedFeeCollectModule: {
                //   amount: {
                //     currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
                //     value: '2',
                //   },
                //   collectLimit: '20000',
                //   recipient: '0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3',
                //   referralFee: 0,
                // },
            },
            referenceModule: {
                followerOnlyReferenceModule: false,
            },
        }

        // const query = {
        //     mutation: createPost,
        //     variables: {
        //         request: createPostRequest,
        //     },
        // }

        const LENS_API = "https://api-mumbai.lens.dev/"

        const defaultOptions = {
            watchQuery: {
                fetchPolicy: "no-cache",
                errorPolicy: "ignore",
            },
            query: {
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            },
        }

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                )

            if (networkError) console.log(`[Network error]: ${networkError}`)
        })

        const httpLink = new HttpLink({
            uri: LENS_API,
            fetch,
        })

        const res = await fetch("/api/token")
        const resultToken = await res.json()
        const authLink = new ApolloLink((operation, forward) => {
            const token = resultToken.token
            console.log("jwt token:", token)

            // Use the setContext method to set the HTTP headers.
            operation.setContext({
                headers: {
                    "x-access-token": token ? `Bearer ${token}` : "",
                },
            })
            console.log("123")

            // Call the next link in the middleware chain.
            return forward(operation)
        })

        const apolloClient = new ApolloClient({
            link: from([errorLink, authLink, httpLink]),
            cache: new InMemoryCache(),
            defaultOptions: defaultOptions,
        })

        console.log("queringgg")
        const result = await apolloClient.mutate({
            mutation: CreatePostTypedDataDocument,
            variables: {
                request: createPostRequest,
            },
        })
        console.log("passed")

        console.log("result", result)
        const graphRes = result.data.createPostTypedData

        // const graphRes = (await graphql.fetchGraphQL("https://api-mumbai.lens.dev/", query)).data
        //     .createPostTypedData

        console.log("graphRes", graphRes)
        const typedData = graphRes.typedData
        const { domain, types, value } = typedData

        const {
            data: signature,
            isError,
            isLoading,
            isSuccess,
            signTypedData,
        } = useSignTypedData({
            domain,
            types,
            value,
        })

        while (isLoading) {}
        const { v, r, s } = ethers.utils.splitSignature()

        const lensContractInstance = new ethers.Contract(contractAddresses.lens, lensAbi, signer)

        var tx = await lensContractInstance.postWithSig({
            profileId: typedData.value.profileId,
            contentURI: typedData.value.contentURI,
            collectModule: typedData.value.collectModule,
            collectModuleInitData: typedData.value.collectModuleInitData,
            referenceModule: typedData.value.referenceModule,
            referenceModuleInitData: typedData.value.referenceModuleInitData,
            sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline,
            },
        })

        return await tx.wait()
    }

    return {
        createLensPost,
    }
}

export default useLens
