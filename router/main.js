module.exports = function(app, fs)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });
    app.get('/stores', function (req, res) {
        //__dirname : 현재 모듈 위치
        fs.readFile( __dirname + "/../data/" + "store.json", "utf8", function (err, data) {
            console.log( data );
            res.end( data );
        });
     });

     app.post('/stores', function (req, res) {
        var result = {  };
        var store = req.body;

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/store.json", 'utf8',  function(err, data){
            var stores = JSON.parse(data);
            
            stores.push(store)
            console.log(store)
            fs.writeFile(__dirname + "/../data/store.json",
                            
                JSON.stringify(stores, null, '\t'), "utf8", function(err, data){
                    result = {"success": 1};
                    res.json(result);
                }
            )

        })

     });

     app.get('/menus', function (req, res) {
        //__dirname : 현재 모듈 위치
        fs.readFile( __dirname + "/../data/" + "menu.json", "utf8", function (err, data) {
            console.log( data );
            res.end( data );
        });
     });


     app.post('/menus', function (req, res) {
        var result = {  };
        var menu = req.body;

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/menu.json", 'utf8',  function(err, data){
            var menus = JSON.parse(data);
            
            menus.push(menu)
            console.log(menus)
            fs.writeFile(__dirname + "/../data/menu.json",
                            
                JSON.stringify(menus, null, '\t'), "utf8", function(err, data){
                    result = {"success": 1};
                    res.json(result);
                }
            )

        })

     });

     app.get('/tags', function (req, res) {
        //__dirname : 현재 모듈 위치
        fs.readFile( __dirname + "/../data/" + "tag.json", "utf8", function (err, data) {
            console.log( data );
            res.end( data );
        });
     });


     app.post('/tags/:id', function (req, res) {
        var result = {  };
        var tag = req.body;

        var id = req.params.id
        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/tag.json", 'utf8',  function(err, data){
            var tags = JSON.parse(data);
            if(!tags[id]) {

                tags[id]=new Array(tag)
            }else {
                tags[id].push(tag)
            }
            console.log(tags)
            fs.writeFile(__dirname + "/../data/tag.json",
                            
                JSON.stringify(tags, null, '\t'), "utf8", function(err, data){
                    result = {"success": 1};
                    res.json(result);
                }
            )

        })

     });
}