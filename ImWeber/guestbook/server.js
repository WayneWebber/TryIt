var http = require('http'),
    qs = require('querystring'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mongodb = require('mongodb');

db = new mongodb.Db('Good', new mongodb.Server('127.0.0.1', 27017, {}), {});

db.addListener("error", function(error) {
  console.log("Error connecting to mongo -- perhaps it isn't running?");
});


db.open(function(error, client) {
    db.collection('guestbook', function(err, collection) {
        guestbookCollection = collection;

        http.createServer(function (req, res) {
            if (req.url.indexOf('/api/') == 0) {
                handleAPI(req, res);
            }
            else if (req.method == 'GET') {
                handleStatic(req, res);
            }
        }).listen(1337);

        console.log('Server running at http://127.0.0.1:1337/');
    });
});



//
// Rest API
//

function handleAPI(req, res) {
    parts = req.url.split('/').slice(2);

    if (parts[0] == 'guestbook.json' && req.method == 'GET') {

        guestbookCollection.find(function(err, cursor) {
            cursor.toArray(function(err, objects) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(objects));
            });
        });
    }
    else if (parts[0] == 'guestbook.json' && req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
            if (body.length > 4096) {
		// Something fishy going on
                req.connection.destroy();
            }
        });
        req.on('end',function(data) {
            var post;
            if (req.headers['content-type'] == 'application/json') {
                post = JSON.parse(body);
            }
            else {
                      post = qs.parse(body);
            }
                guestbookCollection.insert({name:post.name, date: new Date(post.date), message: post.message}, function(err, objects) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(objects));
            });
        }.bind(this));
    }
}


//
// Static Resources - quick and dirty.  Would use connect or express or some such
//

function handleStatic(req, res) {
    var filePath = url.parse(req.url).pathname;
    filePath = filePath == '/' ? './index.html' : '.' + filePath;

    fs.readFile(filePath, function(error, content) {
        if (error) {
            res.writeHead(404);
            res.end('File not found');
        }
        else {
            var contentType = 'text/html';
            switch (path.extname(filePath)) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}


