const nock = require('nock')
const { api_url } = require('../config')

function nocked(endpoint, data){

    nock(api_url)
            .defaultReplyHeaders({ 'access-control-allow-origin': 
                                    '*', 'access-control-allow-headers': 'Authorization' })
            .intercept(endpoint, "options")
            .reply(200)

    return  nock(api_url)
                 .get(endpoint)
                 .reply(200, data )
                 .log(console.log)

}

module.exports = nocked
