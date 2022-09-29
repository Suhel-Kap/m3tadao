import {useEffect, useRef, useState} from "react"
import {AsyncInput} from "../AsyncInput"
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client'
import {useRouter} from "next/router"
import {ACCOUNTS_SEARCH__QUERY} from "../../constants/graphql/queries";

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
    const [query, setQuery] = useState()
    const router = useRouter()
    const client = new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai',
        cache: new InMemoryCache(),
    })
    useEffect(() => {
        const name = props.value
        if(router.pathname === "/create-organisation" || router.pathname === "/create-release") { // TODO: fix this
            setQuery({
                query: gql(ACCOUNTS_SEARCH__QUERY),
                variables: {
                    search: props.value,
                }
            })
        }
        if(router.pathname === "/create-project"){
            setQuery({
                query: gql`\n query UniqueProject($project: String, $accountName: String){ accounts(where:{name: $accountName}){ projects(where: {name_contains: $project}){ id, name } }}\n`,
                variables: {
                    project: name,
                    accountName: props.parentId
                }
            })
        }
    }, [props.value])

    useEffect(() => {
        setLoading(false);
        setExists(false);
        setError(undefined);

        if (!props.value) return;
        setLoading(true);

        const timeout = setTimeout(() => {
            // this uses the same contract method for accounts, projects, and releases
            if(router.pathname === "/create-release"){ // TODO: fix this
                setError(undefined)
                setExists(false)
                setLoading(false)
                return
            }
            client.query(query).then(res => {
                if (router.pathname === "/create-organisation" && res.data.accounts.length > 0) {
                    setError("Name already exists")
                    setExists(true)
                }
                else if (router.pathname === "/create-project" && res.data.accounts.length > 0) {
                    if(res.data.accounts[0].projects.length > 0) {
                        setError("Name already exists")
                        setExists(true)
                    } else {
                        setError(undefined)
                        setExists(false)
                    }
                }
                else {
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
