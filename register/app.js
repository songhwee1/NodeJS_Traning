const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sessions');
const db = mongoose.connection;

db.once('err', () => {
    console.log(err);
});

db.once('open', () => {
    console.log('DB connected');
});

const UserSchema = mongoose.Schema({
    user_id: String,
    password: String,
    name: String,
    phone: String,
});

//fido
const { Fido2Lib } = require("fido2-lib");

// create a new instance of the library
var f2l = new Fido2Lib();``

const User = mongoose.model('sessions', UserSchema);
const app = require('express')();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const url = require('url');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/sessions",
    })
}));

app.get('/', (req, res) => {
    if (req.session.logined) {
        res.render('logout', {
            id: req.session.user_id
        });
    } else {
        res.render('login');
    }
});

app.post('/regist', (req, res) => {
    res.render('register');
})

app.post('/findID', (req, res) => {
    res.render('findID');
})

app.post('/findpwd', (req, res) => {
    res.render('findPassword');
})

app.post('/register', (req, res) => {
    var uid = req.body.user_id;
    var upwd = req.body.password;
    var uname = req.body.name;
    var uphone = req.body.phone;

    User.findOne({ "user_id": uid }, (err, user) => {
        if (err) return res.json(err);
        if (!user) {
            User.create({ "user_id": uid, "password": upwd, "name": uname, "phone": uphone}, (err) => {
                if (err) return res.json(err);
                console.log('Success');
                res.redirect('/');
            })
        } else {
            console.log('user id duplicate');
            res.send(`
                <a href="/">Back</a>
                <h1>User id duplicate</h1>
            `);
        }
    })

});

app.post('/findIDRst', (req, res) => {
    var uname = req.body.name;
    var uemail = req.body.email;
    var uaddress = req.body.address;
    var uid;
    User.findOne({ "name": uname, "email": uemail, "address": uaddress }, (err, user) => {
        if (err) return res.json(err);
        if (user) {
            res.render('findIDResult', {
                Findid: uname
            });
        } else {
            console.log('can not find ID');
            res.send(`
                <a href="/">Back</a>
                <h1>can not find Id</h1>
            `);
        }
    })
})

app.post('/findPasswordRst', (req, res) => {
    var uid = req.body.user_id;
    var uname = req.body.name;
    var uemail = req.body.email;
    var uaddress = req.body.address;

    User.findOne({ "user_id": uid, "name": uname, "email": uemail, "address": uaddress }, (err, user) => {
        if (err) return res.json(err);
        if (user) {
            res.render('findPasswordResult', {
                passwordid: uname
            });
        } else {
            console.log('can not find Password');
            res.send(`
                <a href="/">Back</a>
                <h1>can not find Password</h1>
            `);
        }
    })
})

app.post('/registBack', (req, res) => {
    res.redirect('/');
})

app.post('/findIDBack', (req, res) => {
    res.redirect('/');
})

app.post('/findPasswordBack', (req, res) => {
    res.redirect('/');
})

app.post('/findIDRstBack', (req, res) => {
    res.redirect('/');
})

app.post('/findPasswordRstBack', (req, res) => {
    res.redirect('/');
})

app.post('/', (req, res) => {
    let id = req.body.user_id;
    let pwd = req.body.password;
    duplicate(req, res, id, pwd);
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('listening 3000port');
});

function duplicate(req, res, uid, upwd) {
    let parseUrl = url.parse(req.url);
    let resource = parseUrl.pathname;
    User.findOne({ "user_id": uid }, (err, user) => {
        if (err) return res.json(err);

        if (!user) {
            console.log('Cannot find user');
            res.send(`
                    <a href="/">Back</a>
                    <h1>rechecking your ID -Can't find user</h1>
                `);
        } else {
            User.findOne({ "password": upwd })
                .exec((err, user) => {
                    if (err) return res.json(err);

                    if (!user) {
                        console.log('login failed');
                        res.send(`
                    <a href="/">Back</a>
                    <h1>Login failed - different password</h1>
                `);
                    } else {
                        console.log('welcome');
                        req.session.user_id = uid;
                        req.session.logined = true;
                        res.redirect('/');
                    }
                })
        }
    })
}