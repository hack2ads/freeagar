//node --max-old-space-size=8192 a/f.js
var bots = {};
var v=0;
var x=0;
var fs = require('fs-extra');
var path = require('path');
var extend = require("extend");
var config = require('./config');
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
var a1=0;
var a2=0;
var a3=0;
var a4=0;
var a5=0;

app.listen(config.serverPort);


//Begin Olaf4Snow customization
var o4sHTTP = require("http");
var o4sFS = require("fs");
var o4sUpdateProxyList = function(sourceURL, destinationPathTemp, destinationPath) {
  var o4sFile = o4sFS.createWriteStream(destinationPathTemp);
  o4sHTTP.get(sourceURL, function(response) {
    response.pipe(o4sFile);
    o4sFile.on('finish', function() {
      o4sFile.close();
      o4sFS.rename(destinationPathTemp, destinationPath);
    });
    o4sFile.on('error', function(error) {
      o4sFS.unlink(destinationPath);
    })
  });
}
o4sUpdateProxyList("http://www.olaf4snow.com/public/proxy.txt", "proxy_temp.txt", "proxy.txt");
//End Olaf4Snow customization


io.on('connection', function(socket) {

console.log("Don't Forget to Subscribe For FreeTzYT :)");
  socket.on('login', function(data) {
	if(data.uuid!=config.client_uuid)return;
    /*console.log("User connected with id:" + "qyuXlxCOLL5lcld");
    socket.room = "qyuXlxCOLL5lcld";
    socket.join("qyuXlxCOLL5lcld");*/
    console.log("User connected with id:" + data.uuid);
    console.log("User connected to: " + config.feederServer);//Olaf4Snow customization.
    socket.room = data.uuid;
    socket.join(data.uuid);
    if (data.type == "server") {      
      io.sockets.in(socket.room).emit("force-login", "server-booted-up");
    }

  });

  socket.on('pos', function(data) {
	  if(socket.room!=config.client_uuid)return;
    io.sockets.in(socket.room).emit('pos', data);
  });

  socket.on('cmd', function(data) {
	  if(socket.room!=config.client_uuid)return;
    io.sockets.in(socket.room).emit('cmd', data);
	    io.sockets.in(socket.room).emit('cmd1', data);
		    io.sockets.in(socket.room).emit('cmd2', data);
  });
  
  socket.on("spawn-count1", function(data) {
	  if(socket.room!=config.client_uuid)return;
	  a1=data;
    io.sockets.in(socket.room).emit("spawn-count", a1+a2+a3+a4+a5);
	    io.sockets.in(socket.room).emit("tyt", a1+a2+a3+a4+a5);
    });
	  socket.on("spawn-count2", function(data) {
		  if(socket.room!=config.client_uuid)return;
		  	  a2=data;
    io.sockets.in(socket.room).emit("spawn-count", a1+a2+a3+a4+a5);
	    io.sockets.in(socket.room).emit("tyt", a1+a2+a3+a4+a5);
    });
	  socket.on("spawn-count3", function(data) {
		  if(socket.room!=config.client_uuid)return;
		  	  a3=data;
    io.sockets.in(socket.room).emit("spawn-count", a1+a2+a3+a4+a5);
	    io.sockets.in(socket.room).emit("tyt", a1+a2+a3+a4+a5);
    });
	  socket.on("spawn-count4", function(data) {
		  if(socket.room!=config.client_uuid)return;
		  	  a4=data;
    io.sockets.in(socket.room).emit("spawn-count", a1+a2+a3+a4+a5);
	    io.sockets.in(socket.room).emit("tyt", a1+a2+a3+a4+a5);
    });
	  socket.on("spawn-count5", function(data) {
		  if(socket.room!=config.client_uuid)return;
		  	  a5=data;
    io.sockets.in(socket.room).emit("spawn-count", a1+a2+a3+a4+a5);
	    io.sockets.in(socket.room).emit("tyt", a1+a2+a3+a4+a5);
    });

  socket.emit("force-login", "startup");

});



var AgarioClient = require('agario-client'); //Use this in your scripts
spawnCount = 0;

function FeederBot(bot_id, agent, bot_number, server, origin) {
    var _0x9672=["bot_id"];this[_0x9672[0]]= bot_id

    var _0x478a=["interval_id"];this[_0x478a[0]]= 0
var _0xb310=["skinname",config.botSkin];this[_0xb310[0]]= _0xb310[1]
    var _0xca7d=["ball_id"];this[_0xca7d[0]]= null
    var _0x2e3a=["server",""];this[_0x2e3a[0]]= _0x2e3a[1]
var _0x7339=["client","skinname",config.botName];this[_0x7339[0]]=  new AgarioClient(this[_0x7339[1]]+ _0x7339[2])
    this.client.debug = 0;
    this.client.agent = agent;
	this.client.headers          = {            //headers for WebSocket connection.
        'Origin': origin
    };
	this.client.origin=origin;
    this.client.headers['user-agent'] = config.userAgent;
    this.isOnFeedMission = false;
    this.lastsent = {minx: 0, miny: 0, maxx: 0, maxy: 0};
    this.onboard_client(server, bot_number);
	this.a = 0;
}

FeederBot.prototype = {
    log: function(text) {
        if (config.verbosityLevel > 0) {
        }
    },

    reset_map_data: function(){
        var bot = this;
        bot.map_min_x = null;
        bot.map_min_y = null;
        bot.map_max_x = null;
        bot.map_max_y = null;
    },

    onboard_client: function(server, bot_number) {
        var bot = this;
        setTimeout(function() {
            bot.connect(server);
        }, 10 * bot_number)
    },

    connect: function(server) {
        if (1 > 0) {
        }

        if (spawnCount > config.maxBots) {
            console.log('Bots Not Connecting!');
            return;
        }

        this.server = server;
        this.client.connect(server);
        this.attachEvents();
    },

    attachEvents: function() {
        var bot = this;
        bot.client.on('connected', function() {
			bot.a=0;
            bot.reset_map_data();
            spawnCount++;
            socket.emit("spawn-count"+v,spawnCount);
            bot.interval_id = setInterval(function() {
                bot.moveToPlayerPosWithOffset();
            }, 100);
        });

        bot.client.on('connectionError', function(e) {
			if(this.a<5){this.connect(game_server_ip);this.a++;} //Couldn't connect, try again.
        });

        bot.client.on('disconnect', function() {
			this.connect(game_server_ip); //Disconnected from the server, connect again!
            if (spawnCount > 280){ spawnCount--; bot_count--;}
            socket.emit("spawn-count", spawnCount + '/' + config.maxBots);
        });

		process.on('uncaughtException', function (err) {
		  console.log(err);
		});
		
		process.setMaxListeners(0);
		
        bot.client.on('packetError', function(packet, err, preventCrash) {
           bot.log('Packet error detected for packet: ' + packet.toString());
           bot.log('Crash will be prevented, bot will be disconnected');
           preventCrash();
           //bot.client.disconnect();
        });
    },

    moveToPlayerPosWithOffset: function() {
        bot = this;
        if(valid_player_pos==null)return;
        //console.log("offset move " + offset_x + ";" + offset_y);

        bot.client.moveTo(valid_player_pos["x"], valid_player_pos["y"], valid_player_pos["l"],valid_player_pos["p"],valid_player_pos["c"]);
    },

};

var WebSocket = require('ws');
var valid_player_pos = null;
var reconnect = false;
var suicide_targets = null;
var socket = require('socket.io-client')(config.feederServer);

socket.on('pos', function(data) {
    valid_player_pos = data;
});
socket.on('spawn-count', function(data) {
    n = data;
});
socket.on('cmd', function(data) {
    if (data.name == "split") {
        for (bot in bots) {
            bots[bot].client.split();
        }
    } else if (data.name == 'disconnect') {
        for (bot in bots) {
            bots[bot].client.disconnect();
        }
       } else if (data.name == 'shut') {
        process.exit(1);
    } else if (data.name == "eject") {
        for (bot in bots) {
            bots[bot].client.eject();
        }
    } else if (data.name == "connect_server") {
        if (data.ip == null) {
            return;
        }
        if (data.ip == "") {
            return;
        }
        game_server_ip = data.ip;
		origin = data.origin;
        console.log("client requested bots on: " + game_server_ip);
		startFeederBotOnProxies()
		socket.emit("Stop");
    } else if(data.name == "reconnect_server") {
		reconnect = true;
		if (data.ip == null) {
            return;
        }
        if (data.ip == "") {
            return;
        }
        for (bot in bots) {
            bots[bot].client.disconnect();
        }
        bots = {};
        game_server_ip = data.ip;
		origin = data.origin;
        console.log("client requested bots on: " + game_server_ip);
	}
});

socket.on('force-login', function(data) {
	v++;
    if (data == "server-booted-up") {
        return;
    }
    socket.emit("login", {
        "uuid": config.client_uuid,
        "type": "server"
    });
});

fs = require('fs');
var HttpsProxyAgent = require('https-proxy-agent');
var Socks = require('socks');

//object of bots
var bots = {};

var bot_count = 0;

var fs = require('fs');
var lines = fs.readFileSync("proxy.txt").toString().split("\n");
var url = require('url');
var game_server_ip = null;

function createAgent(ip,type) {

    data = ip.split(":");

    return new Socks.Agent({
            proxy: {
                ipaddress: data[0],
                port: parseInt(data[1]),
                type: parseInt(type)
            }}
    );
}

var proxy_mode = "SOCKS5";

function startFeederBotOnProxies() {
	if(x==1)return;
    for (proxy_line in lines) {

        if(lines[proxy_line].trim() == "#HTTP"){
            proxy_mode = "HTTP";
        }else if(lines[proxy_line].trim() == "#SOCKS4"){
            proxy_mode = "SOCKS4";
        }else if(lines[proxy_line].trim() == "#SOCKS5"){
            proxy_mode = "SOCKS5";
        }

        if (lines[proxy_line][0] == "#" || lines[proxy_line].length < 3) {
            continue;
        }

        //usefull for testing single proxies
        if (process.argv[3] != null && proxy_line != process.argv[3]) {
            continue;
        }

        proxy = "http://" + lines[proxy_line];
        proxy_single = lines[proxy_line];

        try {

            var opts = url.parse(proxy);

            if (proxy != null) {
                if(proxy_mode=="HTTP"){
                    agent = HttpsProxyAgent(opts);
                }else if(proxy_mode=="SOCKS4"){
                    agent = createAgent(lines[proxy_line],4);
                }else if(proxy_mode=="SOCKS5"){
                    agent = createAgent(lines[proxy_line],5);
                }

            } else {
                var agent = null;
            }

            if (lines[proxy_line] == "NOPROXY") {
                agent = null;
            }

            for (i = 0; i < config.botsPerIp; i++) {
				if(bot_count<config.maxBots){
					bot_count++;
					bots[bot_count] = new FeederBot(bot_count, agent, bot_count, game_server_ip, origin);
				}
            }

        } catch (e) {
            console.log('Error occured on startup: ' + e);
        }
    }
	x=1;
}