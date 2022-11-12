module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      let drinks = [
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619490476346-FVZVL8SIEXGJR7QKROZM/IMG_2616.jpg?format=1000w", name:'Matcha Green Tea Boba', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619556635939-QN94MU8O4CRMKOMEUOKU/IMG_2603%252525281%25252529.jpg?format=1000w", name:'Thai Milk Tea Boba Float', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619556596214-D499WX1ML70WWB0J8PSD/IMG_2608.jpg?format=1000w", name:'Chocolate Oreo Boba Float', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619556649213-ARSI7V333ID25NJYBK6K/IMG_2612.jpg?format=1000w", name:'Strawberry Cream Boba Float', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609725016634-0M9C3R53ZJSX4851WGJP/Vanilla.jpg?format=750w",name:'Madagascar Vanilla', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609725872372-8RHT69WNHQ9FLSEJMZ6M/Strawberry.jpg?format=750w",name:'Strawberry Cream', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609726737748-81NHHAARCHK8ZVT2DY84/Oreo.jpg?format=750w", name:'Cookies n cream', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1645668267796-Z43K1G1WN852J65NS4GR/BirthdayCake.jpg?format=750w", name:'Birthday Cake', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609781913568-NBSEZOHC3WUD0690JBY4/Macha.jpg?format=750w", name:'Matcha Green Tea', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609852066693-SS5OYUAIJV5V6P43C9JD/Ube_0814.jpg?format=750w", name:'Purple Yam', price:10}
        
      ]
        db.collection('drinks').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            cart: result,
            drinks: drinks
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });
// route to icecream
    // app.get('/icecream', isLoggedIn, function(req, res) {
    //   let drinks = [
    //     {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609725016634-0M9C3R53ZJSX4851WGJP/Vanilla.jpg?format=750w",name:'Madagascar Vanilla', price:10},
    //     {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609725872372-8RHT69WNHQ9FLSEJMZ6M/Strawberry.jpg?format=750w",name:'Strawberry Cream', price:10},
    //     {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609726737748-81NHHAARCHK8ZVT2DY84/Oreo.jpg?format=750w", name:'Cookies n cream', price:10},
    //     {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1645668267796-Z43K1G1WN852J65NS4GR/BirthdayCake.jpg?format=750w", name:'Birthday Cake', price:10},
    //     {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609781913568-NBSEZOHC3WUD0690JBY4/Macha.jpg?format=750w", name:'Matcha Green Tea', price:10},
    //     {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1609852066693-SS5OYUAIJV5V6P43C9JD/Ube_0814.jpg?format=750w", name:'Purple Yam', price:10}
        
    //   ]
    //     db.collection('drinks').find().toArray((err, result) => {
    //       if (err) return console.log(err)
    //       res.render('profile.ejs', {
    //         user : req.user,
    //         cart: result,
    //         drinks: drinks,
    //         checkout: checkout
    //       })
    //     })
    // });

    //wholesale page route
//     app.get('/wholesale', isLoggedIn, function(req, res) {
//     db.collection('drinks').find().toArray((err, result) => {
//       if (err) return console.log(err)
//       res.render('profile.ejs', {
//         user : req.user,
//         cart: result,
//         drinks: drinks
//       })
//     })
// });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================
// create the documents 
// use image address
    app.post('/addToCart', (req, res) => {
      console.log(req.body)
      db.collection('drinks').save({name: req.body.name, price:parseInt(req.body.price), src:req.body.img, time:new Date().toLocaleTimeString()}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
//when the user clicks on add to cart button.. the addedtocart property will be set to true
    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/deleteFromCart', (req, res) => {
      db.collection('drinks').findOneAndDelete({src: req.body.img}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    //fake checkout
    app.post('/checkout', (req, res) => {
      
      db.collection('drinks').save({name: req.body.name, color:req.body.color, price:req.body.price, src:req.body.img, time:new Date().toLocaleTimeString()}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.get('/checkout', isLoggedIn, function(req, res) {
      let drinks = [
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619490476346-FVZVL8SIEXGJR7QKROZM/IMG_2616.jpg?format=1000w", name:'Matcha Green Tea Boba', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619556635939-QN94MU8O4CRMKOMEUOKU/IMG_2603%252525281%25252529.jpg?format=1000w", name:'Thai Milk Tea Boba Float', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619556596214-D499WX1ML70WWB0J8PSD/IMG_2608.jpg?format=1000w", name:'Chocolate Oreo Boba Float', price:10},
        {src:"https://images.squarespace-cdn.com/content/v1/5d37aad84b9d1f000100f413/1619556649213-ARSI7V333ID25NJYBK6K/IMG_2612.jpg?format=1000w", name:'Strawberry Cream Boba Float', price:10}
        
      ]
        db.collection('drinks').find().toArray((err, result) => {
          if (err) return console.log(err)
          let totalPrice = 0
          for(let i=0;i<result.length; i++){
            totalPrice += result[i].price
          }
          res.render('checkout.ejs', {
            user : req.user,
            cart: result,
            drinks: drinks,
            totalPrice: totalPrice
          })
        })
    });

    app.delete('/deleteFromCHeckout', (req, res) => {
      db.collection('drinks').findOneAndDelete({src: req.body.img}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
