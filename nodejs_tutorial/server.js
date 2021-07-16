const express = require('express');
const app = express();

const server = app.listen(3000, () => {
    console.log('Start Server : localhost:3000');
});

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '127.0.0.1',
    user            : 'root',
    password        : '1234',
    database        : 'bbs'
});

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.get('/', function(req,res) {
    res.render('index.html')
})

app.get('/about', function(req,res) {
    res.send('about page')
})


app.get('/db',function(req,res){
    pool.getConnection(function(err,connection){
        if (err) throw err;

        connection.query('select * from bbs', function (error,results, fields){
            res.send(JSON.stringify(results));
            console.log('results', results);
            connection.release();

            if (error) throw error;
        });
    });
});