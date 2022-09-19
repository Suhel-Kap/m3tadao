import {useEffect, useState} from "react"
import {AsyncInput} from "../AsyncInput"
import {graphql} from "@valist/sdk"
import {useRouter} from "next/router";
import {GraphqlQuery} from "@valist/sdk/dist/graphql";
import {useAccount} from "wagmi";

export interface NameInputProps {
    parentId: string | number;
    disabled?: boolean;
    value?: string;
    error?: string;
    label?: string;
    placeholder?: string;
    query: string;
    variables: object;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function NameInput(props: NameInputProps) {
    const [loading, setLoading] = useState(false)
    const [exists, setExists] = useState(false)
    const [error, setError] = useState<string>()
    const [query, setQuery] = useState<GraphqlQuery>()
    const router = useRouter()
    useEffect(() => {
        console.log(props.value)
        if(router.pathname === "/create-organisation") {
            setQuery({
                query: graphql.ACCOUNTS_SEARCH__QUERY,
                variables: {
                    search: props.value,
                }
            })
        }
        if(router.pathname === "/create-project"){
            setQuery({
                query: graphql.ACCOUNT_PROJECT_QUERY,
                variables: {
                    accountID: "fdsfsf",
                }
            })
        }
    }, [router])

    useEffect(() => {
        setLoading(false);
        setExists(false);
        setError(undefined);

        if (!props.value) return;
        setLoading(true);

        const timeout = setTimeout(() => {
            // this uses the same contract method for accounts, projects, and releases
            console.log(query)
            graphql.fetchGraphQL("https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai", query).then(res => {
                console.log(res)
                if (res.data.accounts.length > 0) {
                    setError("Name already exists");
                    setExists(true);
                } else {
                    setError(undefined);
                    setExists(false);
                }
            }).finally(() => setLoading(false))
        }, 1000);

        return () => clearTimeout(timeout);
    }, [props.value, props.parentId]);

    useEffect(() => {
        if (exists) {
            setError("Name has been taken");
        }
    }, [exists]);

    const isValid = !!props.value && !exists && !loading;

    return (
        <AsyncInput
            value={props.value}
            error={error ?? props.error}
            disabled={props.disabled}
            loading={loading}
            label={props.label}
            placeholder={props.placeholder}
            required={props.required}
            valid={isValid}
            onChange={props.onChange}
        />
    );
}
