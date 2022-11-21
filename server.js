const http = require('http');
const fs = require('fs');
function factorial(num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  }
  
  const isPrime = (num) => {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };
const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == "/contacts") {
        fs.readFile("." + req.url + ".json", (err, data) => {
            res.writeHead(200, { 'content-type': "application/json" })
            res.write((data));
            console.log(JSON.stringify(data));
            res.end();
            const q = JSON.parse(data);
            console.log(q);
        })
    }
    if (req.url.startsWith("/contacts/")) {
        const id = req.url.split("/")[2];
        console.log(id);
        fs.readFile("./contacts.json", (err, data) => {
            const parseData = JSON.parse(data);
            const find = parseData.find((e) => e.id == id);
            console.log(find);
            if (err) {
                res.writeHead(404, { "content-type": "text/html" });
                res.write("404");
                return res.end();
            }
            if (find) {
                res.writeHead(200, { "content-type": "application/json" });
                res.write(JSON.stringify(find));
                res.end()
            } else {
                res.writeHead(400, { "content-type": "application/json" });
                res.write("404");
                res.end()
            }

        }
        )
    }
    if (req.url.startsWith("/comps/")) {
        const num = req.url.split("/")[3];
        const currentComps = req.url.split("/")[2];
        
        console.log("curentComps:", currentComps, "\nnum:", num);
  
        //factorial
        if (currentComps == "factorial") {
          res.writeHead(200, { "Content-type": "text/html" });
          res.write(factorial(num).toString());
          res.end();
        }
  
        // prime
        if (currentComps == "prime") {
          res.writeHead(200, { "Content-type": "text/html" });
          res.write(isPrime(num).toString());
          res.end();
        }
    }
    else {
        fs.readFile('.' + req.url + '.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'content-type': 'text/html' });
                res.write('404 page not found');
                res.end();
                console.log('error');
            }
            else {
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(data.toString());
                res.end();
                console.log('200 ok');
            }
        })
    }

}).listen(3001);





