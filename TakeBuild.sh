cf login -a https://api.cf.eu10.hana.ondemand.com -u vishnu.nair@ivldsp.com -p Ivl@2024 -o optivms -s dev
cd GST-PORTAL

cf push
cd ..
cd GST-UI
npm run build
cf push GST-UI -m 512M -k 2G -b nodejs_buildpack -c "npm start"