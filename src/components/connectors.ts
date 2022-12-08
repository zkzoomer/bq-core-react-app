import { InjectedConnector } from "@web3-react/injected-connector";

export const connectors: { [key: string]: any } = {
    injected: new InjectedConnector({ }),
};