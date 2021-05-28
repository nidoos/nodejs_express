var http = require('http');
var cookie = require('cookie');

http.createServer(function (request, response) {
    console.log(request.headers.cookie);
    var cookies = {};
    if (request.headers.cookie != undefined) {
        cookies = cookie.parse(request.headers.cookie);
    }
    response.writeHead(200, {
        //쿠키를 key-value 형태로
        //복수의 쿠키를 쓰려면 인자로 배열을 주도록 한다.
        'Set-Cookie': [
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`,
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie',
            'Domain=Domain; Domain=o2.org'
        ]
    });
    response.end('Cookie!!');
}).listen(3000);

//expires : 쿠키가 언제 죽을것인지
//max-age : 현재 기점으로 쿠키가 얼마동안 살아있을 것인지
//path : 특정 디렉토리에서만 쿠키 활성화

