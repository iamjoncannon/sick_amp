serv: 
	nodemon dev-server.js & tsc -p ./server -w

client:
	webpack -w --progress