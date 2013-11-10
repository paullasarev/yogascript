1. install node-XXX.msi from http://nodejs.org/ (depends on 32/64 bit host system)

2. run "npm install"

3. run "npm start" or "node app"

4. browse http://localhost:3000/

the whole ./public/ folder is statically exposed by express web-server

Using the 'nodemon' utility.
It is quite convinitent to use the 'nodemon' to automagically restart node on any changes in sources.
* run 'npm install -g nodemon'
* run 'nodemon app.js'
* on any changes in sources tree the 'node' will be restarted by 'nodemon'