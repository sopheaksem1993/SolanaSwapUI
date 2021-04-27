import { HashRouter, Route } from "react-router-dom";
import React from "react";
import { ChartsView } from "./components/charts";

import { WalletProvider } from "./context/wallet";
import { ConnectionProvider } from "./utils/connection";
import { AccountsProvider } from "./utils/accounts";
import { CurrencyPairProvider } from "./utils/currencyPair";
import {TierProvider} from './utils/tier';
import { MarketProvider } from "./context/market";
import { PoolOverview } from "./components/pool/view";
import { ExchangeView } from "./components/exchange";
import { ProjectView } from "./components/project";

export function Routes() {
  return (
    <>
      <HashRouter basename={"/"}>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <CurrencyPairProvider>
                  <TierProvider>
                    <Route exact path="/" component={ExchangeView} />
                    <Route exact path="/add" component={ExchangeView} />
                    <Route exact path="/info" component={() => <ChartsView />} />
                    <Route
                      exact
                      path="/pool"
                      component={() => <PoolOverview />}
                    />
                    <Route 
                      exact
                      path="/project"
                      component={() => <ProjectView/>}
                    />
                  </TierProvider>
                </CurrencyPairProvider>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </HashRouter>
    </>
  );
}
