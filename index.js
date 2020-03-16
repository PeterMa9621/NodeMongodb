var http = require('http');
var https = require('https');
var url = require('url');
const fs = require('fs');
var Database = require('./database/database.js');
var util = require('./util/util');

const port = 8080;

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

function setUpProxyServer() {
    https.createServer(options,function (req, res) {
        try{
            let body = [];
            //let requestHeader = req.headers;
            let parsedUrl = url.parse(req.url, true);
            let query = parsedUrl.query;
            if(query.url !== undefined)
                var destinationUrl = query.url;

            res.setHeader("access-control-allow-origin", '*');
            var proxy = https.get(destinationUrl, function (proxyResponse) {
                proxyResponse.pipe(res, {
                    end: true
                });
            });

            req.pipe(proxy, {
                end: true
            })
        } catch (e) {
            console.log(e);
        }



        /*
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', (a) => {
            console.log(body.toString());
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello World!');
         */
    }).listen(port);
    console.log('Server is listening on localhost, port ' + port);
}

function main(argv){
    setUpProxyServer();
}

main(process.argv.slice(2));