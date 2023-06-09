import { SignalStrengths } from "./SignalStrengths";

interface Node {
  name?: string;
  nodeId: string;
  location?: string;
  humidity?: number;
  pressure?: number;
  salinity?: number;
  temperature?: number;
  voltage?: number;
  lastActivity: string;
  count?: number;
  total?: number;
  gatewayUID: string;
  /**
   * The signal strength for this node - lora bars.
   */
  bars: SignalStrengths;
}

export default Node;
