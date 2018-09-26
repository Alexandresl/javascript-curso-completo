module.exports = (app) => {

    app.get('/', (req, res) => {

        res.statusCode = 200;
        res.setHeader('content-Type', 'text/html');
        res.end('<h1>Olá</h1>');

        console.log('URL:', req.url);
        console.log('METHOD:', req.method);

    });

};