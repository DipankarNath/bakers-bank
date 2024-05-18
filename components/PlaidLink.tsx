import React, {useCallback, useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";
import {useRouter} from "next/navigation";
import {createLinkToken, exchangePublicToken} from "@/lib/actions/user.actions";

const PlaidLink: React.FC<PlaidLinkProps> = ({user, variant}) => {
    const router = useRouter();

    const [token, setToken] = useState('');

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({publicToken: public_token, user});
        router.push('/');
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    };
    const {open, ready} = usePlaidLink(config);

    useEffect(() => {
        const getNewToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        };
    }, [user]);

    return (
        <>
            {(variant === 'primary') ? (
                <Button className={'plaidlink-primary'} onClick={() => open()} disabled={!ready}>
                    Connect Bank
                </Button>
            ) : (variant === 'ghost') ? (
                <Button className={'plaidlink-ghost'}>
                    Connect Bank
                </Button>
            ) : (
                <Button className={'plaidlink'}>
                    Connect Bank
                </Button>
            )}
        </>
    );
};

export default PlaidLink;
