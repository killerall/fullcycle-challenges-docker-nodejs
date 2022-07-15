var random_name = require('node-random-name');
const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const table = `CREATE TABLE if not exists people (name VARCHAR(100));`
connection.query(table)
//connection.end()
app.get('/',asyncWrapper(asyncget));


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function asyncWrapper(fn) {
    return (req, res, next) => {
      return Promise.resolve(fn(req))
        .then((result) => res.send(result))
        .catch((err) => next(err))
    }
  }
  async function  asyncget(req){
    var sql = `INSERT INTO people(name) values('`+random_name()+ `')`;
    var connection = mysql.createConnection(config);
    connection.query(sql);
    connection.end()
    var connection = mysql.createConnection(config);
    var html = "";

    
    const results = await getNames();
        
        results.forEach( (value) => {
            //console.log(value)
            console.log(value.name)
            html += value.name +"<br>"
        });
        
    console.log("--------------------------------------------")
    console.log(html)
    
    return ('<h1>Full Cycle Rocks!</h1><br>'+html)    
    
    
}
function getNames() {
    return new Promise(resolve => {
        
        connection.query(`select name from people`, function (err, result) {
          if(err) throw err;
          resolve(result);
        });
      });
    }