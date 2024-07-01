cd GST-PORTAL
cf push
cd ..
cd GST-UI
npm run build
cf push GST-UI -m 512M -k 2G -b nodejs_buildpack -c "npm start"