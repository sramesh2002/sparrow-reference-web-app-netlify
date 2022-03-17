import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import Gateway from "../components/models/Gateway";
import { services } from "../services/ServiceLocator";

async function getGateway(gatewayUID: string) {
  const endpoint = services().getUrlManager().getGateway(gatewayUID);
  const response: AxiosResponse = await axios.get(endpoint);
  return response.data as Gateway;
}

// todo should these custom Hook be in a separate folder of individual Hooks??
export function useGateway(gatewayUID: string, refetchInterval?: number) {
  return useQuery<Gateway, Error>("getGateway", () => getGateway(gatewayUID), {
    refetchInterval,
    enabled: !!gatewayUID,
  });
}

async function getGateways() {
  const endpoint = services().getUrlManager().getGateways();
  const response: AxiosResponse = await axios.get(endpoint);
  return response.data as Gateway[];
}

export function useGateways(refetchInterval?: number) {
  return useQuery<Gateway[], Error>("getGateways", () => getGateways(), {
    refetchInterval,
  });
}

const DEFAULT = { useGateway, useGateways };
export default DEFAULT;
