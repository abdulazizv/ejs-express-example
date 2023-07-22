const http = require('http');



const server = http.createServer(function(req,res){
    res.writeHead(201,{
        'Content-type':'application/json'
    })

    const resp = {message:'Hello c'}
    res.end(JSON.stringify(resp))
})


server.listen(3000,() => {
    console.log('Server is running at 3000 port')
})
