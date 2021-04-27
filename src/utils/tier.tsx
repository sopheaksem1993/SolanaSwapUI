import React, { useContext } from "react";
import CONSTANT from './constant';
import {
    useAccountByMint,
    cache,
  } from "./accounts";
import { useConnectionConfig } from './connection';
import { convert } from "./utils";
export interface TierConfig {
    tier: number,
}

const tierContext = React.createContext<TierConfig>({
    tier: CONSTANT.DEFAULT_TIER,
});


export function TierProvider ({children = undefined as any}) {

    let tier = CONSTANT.DEFAULT_TIER;
    let TokenXBalance: number = 0;
    const { tokens } = useConnectionConfig();
    const tokenX = tokens?.find((token) =>  token.symbol === CONSTANT.PLATFORM_TOKEN_SYMBOL);
    const tokenMint = cache.getMint(tokenX?.address);
    const tokenAccount = useAccountByMint(tokenX?.address); 
    if (tokenAccount && tokenMint) {
        TokenXBalance = convert(tokenAccount, tokenMint);
    }
    if (TokenXBalance) {
        if (TokenXBalance < 1) {
        tier = 4
        } else if (TokenXBalance < 2) {
            tier = 3
        } else if (TokenXBalance < 3) {
            tier = 2
        } else {
            tier = 1
        } 
    }

    return (
        <tierContext.Provider
            value={{
                tier,
            }}
        >
            {children}
        </tierContext.Provider>
    )
}

export function useTiers() {
    const context = useContext(tierContext);
    return {
        tier: context.tier,
    }
}