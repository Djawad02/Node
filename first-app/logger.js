const EventEmitter = require('events');

var url = "http://mylogger.io/log";

class Logger extends EventEmitter{
    log(message){
        //send http request
        console.log(message);
        this.emit('messageLogged',{id:1,url:"../"});
    }

}


module.exports= Logger;
