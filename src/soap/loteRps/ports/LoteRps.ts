import { EnviarRequest } from '../definitions/EnviarRequest';
import { EnviarRequest1 } from '../definitions/EnviarRequest1';

export interface LoteRps {
  enviar(
    enviarRequest: EnviarRequest,
    callback: (
      err: unknown,
      result: EnviarRequest1,
      rawResponse: unknown,
      soapHeader: unknown,
      rawRequest: unknown,
    ) => void,
  ): void;
}
