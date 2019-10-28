serv: 
	nodemon dev-server.js & tsc -p ./server -w

client:
	webpack -w --progress

client-compile:
	NODE_ENV=production webpack -p --progress