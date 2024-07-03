const hana = require('@sap/hana-client');

let conn = null;

const connParams = {
  serverNode: '23333b42-3f58-48ca-b4e6-083fa2ccad13.hana.prod-eu10.hanacloud.ondemand.com:443',
  uid: '10E12495F1164C51B8772F9B355264FA_6YYR2QQD4L5YCNCH32FANUUXQ_DT',
  pwd: 'Iq0vSi4QS0kAhj5v0H5xVTKTcbQPOTVK4U.PMHpT5WfcKOSy_65NswXUzMDMM4SpHoeAZzg__DKMIfD.3ozipmigclIsCb-IJePZSzEp0ccygcp5tJo8Se4MDS_Y_uGK',
  encrypt: true,
  sslValidateCertificate: true
};

async function connect() {
  if (conn && conn.state === 'connected') {
    return conn;
  }

  conn = hana.createConnection();

  return new Promise((resolve, reject) => {
    conn.connect(connParams, (err) => {
      if (err) {
        conn = null;
        return reject('Error connecting to SAP HANA: ' + err);
      }
      resolve(conn);
    });
  });
}

async function disconnect() {
  if (conn) {
    conn.disconnect();
    conn = null;
  }
}

module.exports = { connect, disconnect };
