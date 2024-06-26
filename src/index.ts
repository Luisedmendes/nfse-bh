// import axios from 'axios';
// import htpps from 'https';

import path from 'path';
import os from 'os';
import fs from 'fs';
import crypto from 'crypto';
import { createClientAsync } from './soap/loteRps';

export class NfseBH {
  protected readonly certTempFile: string;

  constructor(
    protected host: string,
    protected certificate: Buffer,
    protected certPassword: string,
    protected debug = false,
  ) {
    const tempPath = path.join(
      os.tmpdir(),
      `cert-${crypto.randomBytes(4).readUInt32LE(0)}`,
    );

    fs.writeFileSync(tempPath, certificate);
    this.certTempFile = tempPath;
  }

  async enviarLoteAssincrono(): Promise<void> {
    const xml = `<EnviarLoteRpsEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
    <LoteRps Id="lote" versao="1.00">
    <NumeroLote>1</NumeroLote>
    <Cnpj>99999999000191</Cnpj>
    <InscricaoMunicipal>1733160024</InscricaoMunicipal>
    <QuantidadeRps>2</QuantidadeRps>
    <ListaRps>
    <Rps>
    <InfRps Id="rps:1ABCDZ">
    <IdentificacaoRps>
    <Numero>1</Numero>
    <Serie>ABCDZ</Serie>
    <Tipo>1</Tipo>
    </IdentificacaoRps>
    <DataEmissao>2009-06-16T21:00:00</DataEmissao>
    <NaturezaOperacao>1</NaturezaOperacao>
    <RegimeEspecialTributacao>6</RegimeEspecialTributacao>
    <OptanteSimplesNacional>1</OptanteSimplesNacional>
    <IncentivadorCultural>2</IncentivadorCultural>
    <Status>1</Status>
    <Servico>
    <Valores>
    <ValorServicos>1000.00</ValorServicos>
    <ValorDeducoes>10.00</ValorDeducoes>
    <ValorPis>10.00</ValorPis>
    <ValorCofins>10.00</ValorCofins>
    <ValorInss>10.00</ValorInss>
    <ValorIr>10.00</ValorIr>
    <ValorCsll>10.00</ValorCsll>
    <IssRetido>1</IssRetido>
    <ValorIss>10.00</ValorIss>
    <OutrasRetencoes>10.00</OutrasRetencoes>
    <Aliquota>5</Aliquota>
    <DescontoIncondicionado>10.00</DescontoIncondicionado>
    <DescontoCondicionado>10.00</DescontoCondicionado>
    </Valores>
    <ItemListaServico>11.01</ItemListaServico>
    <CodigoTributacaoMunicipio>522310000 </CodigoTributacaoMunicipio>
    <Discriminacao>Teste.</Discriminacao>
    <CodigoMunicipio>3106200</CodigoMunicipio>
    </Servico>
    <Prestador>
    <Cnpj>99999999000191</Cnpj>
    <InscricaoMunicipal>1733160024</InscricaoMunicipal>
    </Prestador>
    <Tomador>
    <IdentificacaoTomador>
    <CpfCnpj>
    <Cnpj>99999999000191</Cnpj>
    </CpfCnpj>
    <InscricaoMunicipal>1733160032</InscricaoMunicipal>
    </IdentificacaoTomador>
    <RazaoSocial>INSCRICAO DE TESTE SIATU - D'AGUA -PAULINO'S </RazaoSocial>
    <Endereco>
    <Endereco>DA BAHIA</Endereco>
    <Numero>200</Numero>
    <Complemento>ANDAR 14</Complemento>
    <Bairro>CENTRO</Bairro>
    <CodigoMunicipio>3106200</CodigoMunicipio>
    <Uf>MG</Uf>
    <Cep>30160010</Cep>
    </Endereco>
    </Tomador>
    <IntermediarioServico>
    <RazaoSocial>INSCRICAO DE TESTE SIATU - D'AGUA -PAULINO'S </RazaoSocial>
    <CpfCnpj>
    <Cnpj>99999999000191</Cnpj>
    </CpfCnpj>
    <InscricaoMunicipal>8041700010</InscricaoMunicipal>
    </IntermediarioServico>
    <ConstrucaoCivil>
    <CodigoObra>1234</CodigoObra>
    <Art>1234</Art>
    </ConstrucaoCivil>
    </InfRps>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="Ass_rps:1ABCDZ">
    <SignedInfo>
    <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>
    <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
    <Reference URI="#rps:1ABCDZ">
    <Transforms>
    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
    </Transforms>
    <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
    <DigestValue>mMyQLAm4psxx52kaD8Jlta3ouPM= </DigestValue>
    </Reference>
    </SignedInfo>
    <SignatureValue> qBKfaNz6RbsYUxCOrjGZ9zrdgiGL7QSBxjlhYRlKDNlDERlDWvM8gi28yus8FoUb0v2CTKKIBz0t zfqxgk60rke4YCMkTzdWfpm7ofMIhYC9VHqbWdInC20znOKygJy5hyIx6JBoyXbejnw/0KF+2E1P 1ZehqXJWZqY+KPaIGAY= </SignatureValue>
    <KeyInfo>
    <X509Data>
    <X509Certificate> MIIE7DCCA9SgAwIBAgIQZMlLC9ZEsHWsnvJNdMI2yzANBgkqhkiG9w0BAQUFADBqMQswCQYDVQQG EwJCUjETMBEGA1UEChMKSUNQLUJyYXNpbDEsMCoGA1UECxMjU2VjcmV0YXJpYSBkYSBSZWNlaXRh IEZlZGVyYWwgLSBTUkYxGDAWBgNVBAMTD0FDIFBST0RFTUdFIFNSRjAeFw0wNzEwMzEwMDAwMDBa Fw0xMDEwMzAyMzU5NTlaMIGQMQswCQYDVQQGEwJCUjETMBEGA1UEChQKSUNQLUJyYXNpbDEqMCgG A1UECxQhU2VjcmV0YXJpYSBkYSBSZWNlaXRhIEZlZGVyYWwtU1JGMRIwEAYDVQQLFAlTUkYgZS1D UEYxLDAqBgNVBAMTI0VER0FSIERPIENBUk1PIEZFUlJFSVJBOjQzMjYwMTUyNjg3MIGfMA0GCSqG SIb3DQEBAQUAA4GNADCBiQKBgQC6M+9XT5KLQN3IH8mAr+S6vxiochY/EwF8EhtNoxPTYl+zr0Dh +eZsRG31bN410nr2OrwncrRorMK8Ngq+j3FnNF0nIMigaaa5NAEfIk3Yy4kuqrTUZBpqUJvCqc3m kF3C3XD0MTmtbVTWCvYIk+qn3t5ShHyMnQcuah5Q0ItSbQIDAQABo4IB6TCCAeUwgZUGA1UdEQSB jTCBiqA9BgVgTAEDAaA0BDIyMTAzMTk2NDQzMjYwMTUyNjg3MDAwMDAwMDAwMDAwMDAwMDBNLTI4 ODQwODVTU1BNR6AXBgVgTAEDBqAOBAwwMDAwMDAwMDAwMDCgHgYFYEwBAwWgFQQTMDAwMDAwMDAw MDAwMDAwMDAwMIEQZWRnYXJAcGJoLmdvdi5icjAJBgNVHRMEAjAAMF8GA1UdHwRYMFYwVKBSoFCG Tmh0dHA6Ly9pY3AtYnJhc2lsLmNlcnRpc2lnbi5jb20uYnIvcmVwb3NpdG9yaW8vbGNyL0FDUFJP REVNR0VTUkYvTGF0ZXN0Q1JMLmNybDAfBgNVHSMEGDAWgBTdO9vtjZcRRUMBQ020Ev0O7niacDAO BgNVHQ8BAf8EBAMCBeAwVQYDVR0gBE4wTDBKBgZgTAECAxQwQDA+BggrBgEFBQcCARYyaHR0cDov L2ljcC1icmFzaWwuY2VydGlzaWduLmNvbS5ici9yZXBvc2l0b3Jpby9kcGMwHQYDVR0lBBYwFAYI KwYBBQUHAwQGCCsGAQUFBwMCMDgGCCsGAQUFBwEBBCwwKjAoBggrBgEFBQcwAYYcaHR0cDovL29j c3AuY2VydGlzaWduLmNvbS5icjANBgkqhkiG9w0BAQUFAAOCAQEAYFcjZj4lGVEREHBaHtcRletW S6/mvpkxmodwj3ele5yXsxuqSZd7ebHbKewXx7gkyaWFkFAxFanQhls2tYKjg6haqt2b0AO1Fsit VIHkMcxRwkU9G+1ec8yfdxymra2VdXazkxuvqKABgxkqKnaFdHjje7cjWDgwparymH64mTlHkSQz 59GutJW0xfwBHcMGx0/9/iIug6pfMQivWf0NMVpFNzxO5ZNPEuOeBhVDxQr4+KB+4B9xDai/3J6f 42UNbSy+z3xuB0K8/7V7BsFUYOYFSNnBrXhvbvXtZOtteX65V0r1+RJJX5OK+PAPhZ57T1LEmHMg gdo5kli3Nr1KFQ== </X509Certificate>
    </X509Data>
    </KeyInfo>
    </Signature>
    </Rps>
    <Rps>
    <InfRps Id="rps:2ABCDZ">
    <IdentificacaoRps>
    <Numero>2</Numero>
    <Serie>ABCDZ</Serie>
    <Tipo>1</Tipo>
    </IdentificacaoRps>
    <DataEmissao>2009-06-16T21:00:00</DataEmissao>
    <NaturezaOperacao>1</NaturezaOperacao>
    <RegimeEspecialTributacao>6</RegimeEspecialTributacao>
    <OptanteSimplesNacional>1</OptanteSimplesNacional>
    <IncentivadorCultural>2</IncentivadorCultural>
    <Status>1</Status>
    <Servico>
    <Valores>
    <ValorServicos>1000.00</ValorServicos>
    <ValorDeducoes>10.00</ValorDeducoes>
    <ValorPis>10.00</ValorPis>
    <ValorCofins>10.00</ValorCofins>
    <ValorInss>10.00</ValorInss>
    <ValorIr>10.00</ValorIr>
    <ValorCsll>10.00</ValorCsll>
    <IssRetido>1</IssRetido>
    <ValorIss>10.00</ValorIss>
    <OutrasRetencoes>10.00</OutrasRetencoes>
    <Aliquota>5</Aliquota>
    <DescontoIncondicionado>10.00</DescontoIncondicionado>
    <DescontoCondicionado>10.00</DescontoCondicionado>
    </Valores>
    <ItemListaServico>11.01</ItemListaServico>
    <CodigoTributacaoMunicipio>522310000 </CodigoTributacaoMunicipio>
    <Discriminacao>Teste.</Discriminacao>
    <CodigoMunicipio>3106200</CodigoMunicipio>
    </Servico>
    <Prestador>
    <Cnpj>99999999000191</Cnpj>
    <InscricaoMunicipal>1733160024</InscricaoMunicipal>
    </Prestador>
    <Tomador>
    <IdentificacaoTomador>
    <CpfCnpj>
    <Cnpj>99999999000191</Cnpj>
    </CpfCnpj>
    <InscricaoMunicipal>1733160032</InscricaoMunicipal>
    </IdentificacaoTomador>
    <RazaoSocial>INSCRICAO DE TESTE SIATU - D'AGUA -PAULINO'S </RazaoSocial>
    <Endereco>
    <Endereco>DA BAHIA</Endereco>
    <Numero>200</Numero>
    <Complemento>ANDAR 14</Complemento>
    <Bairro>CENTRO</Bairro>
    <CodigoMunicipio>3106200</CodigoMunicipio>
    <Uf>MG</Uf>
    <Cep>30160010</Cep>
    </Endereco>
    </Tomador>
    <IntermediarioServico>
    <RazaoSocial>INSCRICAO DE TESTE SIATU - D'AGUA -PAULINO'S </RazaoSocial>
    <CpfCnpj>
    <Cnpj>99999999000191</Cnpj>
    </CpfCnpj>
    <InscricaoMunicipal>8041700010</InscricaoMunicipal>
    </IntermediarioServico>
    <ConstrucaoCivil>
    <CodigoObra>1234</CodigoObra>
    <Art>1234</Art>
    </ConstrucaoCivil>
    </InfRps>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="Ass_rps:1ABCDZ">
    <SignedInfo>
    <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>
    <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
    <Reference URI="#rps:2ABCDZ">
    <Transforms>
    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
    </Transforms>
    <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
    <DigestValue>pcpHZUpTtAfjwEVpnBW5qzDTHtc= </DigestValue>
    </Reference>
    </SignedInfo>
    <SignatureValue> lunW4H0coMPXsBK/+eMkivq6IaEbtkHNRjNQrcZ/pB1Q+SzQK4/MNU+Ohbd3qk+AZKEF1L2Hr5tM xYqzbZpSxiSZx4+Iu5WK6E2g4o60UYPPhmrEliaY6m1KC1w+7S1a67brTgikXHQQ7QKTR32WxMyO TFfLYofoJRfALGFg91s= </SignatureValue>
    <KeyInfo>
    <X509Data>
    <X509Certificate> MIIE7DCCA9SgAwIBAgIQZMlLC9ZEsHWsnvJNdMI2yzANBgkqhkiG9w0BAQUFADBqMQswCQYDVQQG EwJCUjETMBEGA1UEChMKSUNQLUJyYXNpbDEsMCoGA1UECxMjU2VjcmV0YXJpYSBkYSBSZWNlaXRh IEZlZGVyYWwgLSBTUkYxGDAWBgNVBAMTD0FDIFBST0RFTUdFIFNSRjAeFw0wNzEwMzEwMDAwMDBa Fw0xMDEwMzAyMzU5NTlaMIGQMQswCQYDVQQGEwJCUjETMBEGA1UEChQKSUNQLUJyYXNpbDEqMCgG A1UECxQhU2VjcmV0YXJpYSBkYSBSZWNlaXRhIEZlZGVyYWwtU1JGMRIwEAYDVQQLFAlTUkYgZS1D UEYxLDAqBgNVBAMTI0VER0FSIERPIENBUk1PIEZFUlJFSVJBOjQzMjYwMTUyNjg3MIGfMA0GCSqG SIb3DQEBAQUAA4GNADCBiQKBgQC6M+9XT5KLQN3IH8mAr+S6vxiochY/EwF8EhtNoxPTYl+zr0Dh +eZsRG31bN410nr2OrwncrRorMK8Ngq+j3FnNF0nIMigaaa5NAEfIk3Yy4kuqrTUZBpqUJvCqc3m kF3C3XD0MTmtbVTWCvYIk+qn3t5ShHyMnQcuah5Q0ItSbQIDAQABo4IB6TCCAeUwgZUGA1UdEQSB jTCBiqA9BgVgTAEDAaA0BDIyMTAzMTk2NDQzMjYwMTUyNjg3MDAwMDAwMDAwMDAwMDAwMDBNLTI4 ODQwODVTU1BNR6AXBgVgTAEDBqAOBAwwMDAwMDAwMDAwMDCgHgYFYEwBAwWgFQQTMDAwMDAwMDAw MDAwMDAwMDAwMIEQZWRnYXJAcGJoLmdvdi5icjAJBgNVHRMEAjAAMF8GA1UdHwRYMFYwVKBSoFCG Tmh0dHA6Ly9pY3AtYnJhc2lsLmNlcnRpc2lnbi5jb20uYnIvcmVwb3NpdG9yaW8vbGNyL0FDUFJP REVNR0VTUkYvTGF0ZXN0Q1JMLmNybDAfBgNVHSMEGDAWgBTdO9vtjZcRRUMBQ020Ev0O7niacDAO BgNVHQ8BAf8EBAMCBeAwVQYDVR0gBE4wTDBKBgZgTAECAxQwQDA+BggrBgEFBQcCARYyaHR0cDov L2ljcC1icmFzaWwuY2VydGlzaWduLmNvbS5ici9yZXBvc2l0b3Jpby9kcGMwHQYDVR0lBBYwFAYI KwYBBQUHAwQGCCsGAQUFBwMCMDgGCCsGAQUFBwEBBCwwKjAoBggrBgEFBQcwAYYcaHR0cDovL29j c3AuY2VydGlzaWduLmNvbS5icjANBgkqhkiG9w0BAQUFAAOCAQEAYFcjZj4lGVEREHBaHtcRletW S6/mvpkxmodwj3ele5yXsxuqSZd7ebHbKewXx7gkyaWFkFAxFanQhls2tYKjg6haqt2b0AO1Fsit VIHkMcxRwkU9G+1ec8yfdxymra2VdXazkxuvqKABgxkqKnaFdHjje7cjWDgwparymH64mTlHkSQz 59GutJW0xfwBHcMGx0/9/iIug6pfMQivWf0NMVpFNzxO5ZNPEuOeBhVDxQr4+KB+4B9xDai/3J6f 42UNbSy+z3xuB0K8/7V7BsFUYOYFSNnBrXhvbvXtZOtteX65V0r1+RJJX5OK+PAPhZ57T1LEmHMg gdo5kli3Nr1KFQ== </X509Certificate>
    </X509Data>
    </KeyInfo>
    </Signature>
    </Rps>
    </ListaRps>
    </LoteRps>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="Ass_lote">
    <SignedInfo>
    <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>
    <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
    <Reference URI="#lote">
    <Transforms>
    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
    </Transforms>
    <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
    <DigestValue>n42EhtzDSnZ071g+44ZMBCc74UQ= </DigestValue>
    </Reference>
    </SignedInfo>
    <SignatureValue> pQyeXnJ2S9KyUJ1BE3k3PZuDpk7WkD2nMPLoELSLJeNBe9TwmLhImsIUS4inAUreuTsjfrs2BUmC hN6jPA0/1cSR0GbblLsHFN+IwPE2dnPN/u0vIOmsan4MuW1OnlH6KexmDHRj/uFwjoXfSJ0JJE1u 9bYdbsp5LGlFuc//CCQ= </SignatureValue>
    <KeyInfo>
    <X509Data>
    <X509Certificate> MIIE7DCCA9SgAwIBAgIQZMlLC9ZEsHWsnvJNdMI2yzANBgkqhkiG9w0BAQUFADBqMQswCQYDVQQG EwJCUjETMBEGA1UEChMKSUNQLUJyYXNpbDEsMCoGA1UECxMjU2VjcmV0YXJpYSBkYSBSZWNlaXRh IEZlZGVyYWwgLSBTUkYxGDAWBgNVBAMTD0FDIFBST0RFTUdFIFNSRjAeFw0wNzEwMzEwMDAwMDBa Fw0xMDEwMzAyMzU5NTlaMIGQMQswCQYDVQQGEwJCUjETMBEGA1UEChQKSUNQLUJyYXNpbDEqMCgG A1UECxQhU2VjcmV0YXJpYSBkYSBSZWNlaXRhIEZlZGVyYWwtU1JGMRIwEAYDVQQLFAlTUkYgZS1D UEYxLDAqBgNVBAMTI0VER0FSIERPIENBUk1PIEZFUlJFSVJBOjQzMjYwMTUyNjg3MIGfMA0GCSqG SIb3DQEBAQUAA4GNADCBiQKBgQC6M+9XT5KLQN3IH8mAr+S6vxiochY/EwF8EhtNoxPTYl+zr0Dh +eZsRG31bN410nr2OrwncrRorMK8Ngq+j3FnNF0nIMigaaa5NAEfIk3Yy4kuqrTUZBpqUJvCqc3m kF3C3XD0MTmtbVTWCvYIk+qn3t5ShHyMnQcuah5Q0ItSbQIDAQABo4IB6TCCAeUwgZUGA1UdEQSB jTCBiqA9BgVgTAEDAaA0BDIyMTAzMTk2NDQzMjYwMTUyNjg3MDAwMDAwMDAwMDAwMDAwMDBNLTI4 ODQwODVTU1BNR6AXBgVgTAEDBqAOBAwwMDAwMDAwMDAwMDCgHgYFYEwBAwWgFQQTMDAwMDAwMDAw MDAwMDAwMDAwMIEQZWRnYXJAcGJoLmdvdi5icjAJBgNVHRMEAjAAMF8GA1UdHwRYMFYwVKBSoFCG Tmh0dHA6Ly9pY3AtYnJhc2lsLmNlcnRpc2lnbi5jb20uYnIvcmVwb3NpdG9yaW8vbGNyL0FDUFJP REVNR0VTUkYvTGF0ZXN0Q1JMLmNybDAfBgNVHSMEGDAWgBTdO9vtjZcRRUMBQ020Ev0O7niacDAO BgNVHQ8BAf8EBAMCBeAwVQYDVR0gBE4wTDBKBgZgTAECAxQwQDA+BggrBgEFBQcCARYyaHR0cDov L2ljcC1icmFzaWwuY2VydGlzaWduLmNvbS5ici9yZXBvc2l0b3Jpby9kcGMwHQYDVR0lBBYwFAYI KwYBBQUHAwQGCCsGAQUFBwMCMDgGCCsGAQUFBwEBBCwwKjAoBggrBgEFBQcwAYYcaHR0cDovL29j c3AuY2VydGlzaWduLmNvbS5icjANBgkqhkiG9w0BAQUFAAOCAQEAYFcjZj4lGVEREHBaHtcRletW S6/mvpkxmodwj3ele5yXsxuqSZd7ebHbKewXx7gkyaWFkFAxFanQhls2tYKjg6haqt2b0AO1Fsit VIHkMcxRwkU9G+1ec8yfdxymra2VdXazkxuvqKABgxkqKnaFdHjje7cjWDgwparymH64mTlHkSQz 59GutJW0xfwBHcMGx0/9/iIug6pfMQivWf0NMVpFNzxO5ZNPEuOeBhVDxQr4+KB+4B9xDai/3J6f 42UNbSy+z3xuB0K8/7V7BsFUYOYFSNnBrXhvbvXtZOtteX65V0r1+RJJX5OK+PAPhZ57T1LEmHMg gdo5kli3Nr1KFQ== </X509Certificate>
    </X509Data>
    </KeyInfo>
    </Signature>
    </EnviarLoteRpsEnvio>`;
    const SoapClient = await createClientAsync(this.host);
    try {
      const [wsResponse] = await SoapClient.enviarAsync({ mensagemXml: xml });
      if (this.debug) {
        console.log(wsResponse);
        console.log('request', SoapClient.lastRequest);
        console.log('response', SoapClient.lastResponse);
      }
    } catch (error) {
      throw Error(String(error));
    }
  }
}

const host = 'https://bhisshomologa.pbh.gov.br/bhiss-ws/nfse?wsdl';
const nf = new NfseBH(
  host,
  fs.readFileSync('C:/Users/Luis Eduardo/Downloads/certificate.pfx'),
  'Adm@2024',
  true,
);

nf.enviarLoteAssincrono();
