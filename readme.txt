express makes routing easier


res.sendFile() used for routing looks for the absolute path
we can specify the root of the directory after entering the relative path
res.sendFile('relative path', {root: __dirname});

order of middleware is very important
middleware can be used for authentication
app.use() method is an example of middleware

install morgan as a middleware which is a logger