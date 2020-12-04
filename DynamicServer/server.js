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
    const session = JSON.parse(fs.readFileSync('./session.json').toString())
    if (path === '/signin' && method === 'POST') {
        response.setHeader('Content-Type', 'text/html')
        let userArray = JSON.parse(fs.readFileSync('./db/db.json'))
        const array = []
        const lastId = userArray[userArray.length - 1]
        request.on('data', (chunk => array.push(chunk)))
        request.on('end', () => {
            const string = Buffer.concat(array).toString()
            const obj = JSON.parse(string)
            const user = userArray.find(user => user.name === obj.name && user.password === obj.password)
            if (user === undefined) {
                response.statusCode = 404
                response.end('user name or password is not match')
            } else {
                response.statusCode = 200;
                const random = Math.random();
                const session = JSON.parse(
                    fs.readFileSync("session.json").toString()
                );
                session[random] = { user_id: user.id };
                fs.writeFileSync("./session.json", JSON.stringify(session));
                response.setHeader("Set-Cookie", `session_id=${random}; HttpOnly`);
                response.end();
            }
        })
    } else if (path === '/home.html') {
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        const cookie = request.headers["cookie"];
        // here cookie is a string
        let sessionId
        try {
            sessionId = cookie
                .split(";")
                .filter((s) => s.indexOf("session_id=") >= 0)[0]
                .split("=")[1];
        } catch (error) {
            console.log(error);
        }

        if (sessionId && session[sessionId]) {
            response.statusCode = 200;
            const homeHtml = fs.readFileSync("./public/home.html").toString();
            const userId = session[sessionId].user_id
            // console.log("=============");
            // console.log( typeof userId);
            const userArray = JSON.parse(fs.readFileSync("./db/db.json"));
            const user = userArray.find((user) => user.id === userId);
            let string;

            if (user) {
                string = homeHtml.replace("Hello, {{user}}", `Hello, ${user.name}`);
            } else {
                string = homeHtml.replace("Hello, {{user}}", "Please Log In");
            }
            response.write(string);
            response.end();
        } else {
            response.statusCode = 200;
            const homeHtml = fs.readFileSync("./public/home.html").toString();
            const string = homeHtml.replace("Hello, {{user}}", "Please Log In");
            response.write(string);
            response.end();
        }
    } else if (path === '/register.html' && method === 'POST') {
        response.setHeader('Content-Type', 'text/html')
        let userArray = JSON.parse(fs.readFileSync('./db/db.json'))
        const array = []
        const lastId = userArray[userArray.length - 1]
        request.on('data', (chunk => array.push(chunk)))
        request.on('end', () => {
            const string = Buffer.concat(array).toString()
            const obj = JSON.parse(string)
            const newUser = {id: lastId ? lastId.id + 1 : 1, name: obj.name, password: obj.password}
            userArray.push(newUser)
            fs.writeFileSync('./db/db.json', JSON.stringify(userArray))
            response.statusCode = 200
            response.end()
        })

    } else {
        let content
        const suffix = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
        }
        response.statusCode = 200
        response.setHeader('Content-Type', `${suffix[path.split('.').pop()] || 'text/html'};charset=utf-8`)
        try {
            content = fs.readFileSync(`./public${path}`,)
        } catch (error) {
            content = 'No such file'
            response.statusCode = 404
            console.log('no such file')
        }
        response.write(content)
        response.end()
    }


})

server.listen(port)
console.log('watching ' + port + ' success \n please open http://localhost:' + port)