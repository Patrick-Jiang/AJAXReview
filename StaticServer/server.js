const http = require('http')
const fs = require('fs')
const port = process.argv[2]

if (!port) {
    console.log('please indicate the port number \neg:node server.js 8888 ')
    process.exit(1)
}

let server = http.createServer(function (request, response) {
    let baseURL = 'http://' + request.headers.host + '/';
    let parsedUrl = new URL(request.url, baseURL);
    let pathWithQuery = request.url
    let queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    let path = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname
    let query = parsedUrl.query
    let method = request.method

    console.log('Request made：' + pathWithQuery)
    let content
    const suffix = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'jpg': 'image/jpeg',
        'jpeg':'image/jpeg',
        'png': 'image/png',
    }
    response.statusCode = 200
    response.setHeader('Content-Type', `${suffix[path.split('.').pop()] || 'text/html' };charset=utf-8`)
    try {
        content = fs.readFileSync(`./public${path}`, )
    } catch (error) {
        content = 'No such file'
        response.statusCode = 404
        console.log('no such file')
    }
    response.write(content)
    response.end()

})

server.listen(port)
console.log('watching ' + port + ' success \n please open http://localhost:' + port)