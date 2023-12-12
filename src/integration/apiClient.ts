import axios from "axios";

export const quoteApiClient = axios.create({
  baseURL: "http://localhost:3000",
});

const xeroApiServer = axios.create({
  baseURL: "http://localhost:3000",
});

const myobApiServer = axios.create({
  baseURL: "http://localhost:3000",
});

export const accoutingProviders = [
  {
    accountName: "xero",
    api: xeroApiServer,
  },
  {
    accountName: "myob",
    api: myobApiServer,
  },
];

export const dicisionEngine = axios.create({
  baseURL: "http://desicion.com",
});
