import axios from 'axios';
import htpps from 'https';
import fs from 'fs';

const path = 'C:/Users/batata/Downloads/certificate.pfx';
const url = 'https://bhisshomologa.pbh.gov.br/bhiss-ws/nfse?wsdl';
const body = '';
const password = 'Adm@2024';
try {
  const response = await axios.get(url, {
    headers: { 'Content-Type': 'text/xml;charset=utf-8' },
    httpAgent: new htpps.Agent({
      pfx: fs.readFileSync(path),
      passphrase: password,
      rejectUnauthorized: false,
    }),
  });
} catch (error) {
  console.log(error);
}
