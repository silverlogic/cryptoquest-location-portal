let socket;

function connect() {
    socket = new WebSocket('ws://2878e977.ngrok.io/:8000');

    socket.addEventListener('open', function(event) {
        console.log('open');
    });

    socket.addEventListener('error', function(event) {
        console.log('error');
    });

    socket.addEventListener('close', function(event) {
        console.log('close');
    });

    socket.addEventListener('message', function(event) {
        event_info = JSON.parse(event.data);
        console.log('message', event_info);
        event_type = event_info.type;
        event_data = event_info.data;
        if (event_type == 'spawn_list') {
            for (let spawn of event_data.spawns) {
                addSpawn(spawn);
            }
        } else if (event_type == 'spawn_new') {
            addSpawn(event_data.spawn);
        } else if (event_type == 'session_started') {
            addUser(event_data.user)
        } else if (event_type == 'spawn_captured') {
            removeSpawn(event_data.spawn);
        }
    });
}

function addSpawn(spawn) {
    if (spawn.faucet.coin.name == 'Vezt') {
        let spawnList = document.getElementById('spawn-list');
        spawnList.innerHTML = spawnList.innerHTML + '<li id="spawn-' + spawn.id + '"><img src="./images/Vezt.png" width="35" height="35" alt=""> VZT | ' + spawn.amount.replace(/\.?0+$/g, '') + '</li>'
    }
}


function removeSpawn(spawn) {
    let spawnItem = document.getElementById("spawn-" + spawn.id);
    spawnItem.parentNode.removeChild(spawnItem);
}

function addUser(user) {
    let spawnList = document.getElementById('people-list');
    spawnList.innerHTML = spawnList.innerHTML + '<li><img src="./images/people.png" width="25" height="25" alt=""> ' + user.first_name + ' ' + user.last_name + '</li>'
}

function addFaucet() {
    console.log('got it');
    socket.send(JSON.stringify({
        type: 'spawn_add',
        data: {
        }
    }));
}

function bossTime() {
    socket.send(JSON.stringify({
        type: 'shitcoin',
        data: {}
    }));
}

connect();
