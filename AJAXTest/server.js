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
    let path = parsedUrl.pathname
    let query = parsedUrl.query
    let method = request.method

    console.log('Request made：' + pathWithQuery)

    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/index.html', 'utf8'))
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js', 'utf8'))
        response.end()
    } else if (path === '/styles.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/styles.css', 'utf8'))
        response.end()
    } else if (path === '/styles.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/styles.css', 'utf8'))
        response.end()
    } else if (path === '/jQuery.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/jQuery.js', 'utf8'))
        response.end()
    } else if (path === '/newHtml.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/newHtml.html', 'utf8'))
        response.end()
    }else if (path === '/db.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('public/db.json'))
        response.end()
    }  else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`404`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)