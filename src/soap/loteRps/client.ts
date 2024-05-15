import {
  Client as SoapClient,
  createClientAsync as soapCreateClientAsync,
} from 'soap';
import { LoteRpsService } from './services/LoteRpsService';
import { EnviarRequest } from './definitions/EnviarRequest';
import { EnviarRequest1 } from './definitions/EnviarRequest1';

export interface LoteRpsClient extends SoapClient {
  LoteRpsService: LoteRpsService;
  enviarAsync(
    enviarRequest: EnviarRequest,
  ): Promise<[EnviarRequest1, string, unknown, string]>;
}

export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<LoteRpsClient> {
  return soapCreateClientAsync(
    args[0],
    args[1],
    args[2],
  ) as unknown as Promise<LoteRpsClient>;
}
