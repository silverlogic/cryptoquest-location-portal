let socket;

function connect() {
    socket = new WebSocket('ws://localhost:8000');

    socket.addEventListener('open', function(event) {
        console.log('open');
        let status = document.getElementById('connection-status');
        status.innerHTML = 'Connected';
        status.classList.add('connected');
        status.classList.remove('disconnected');
    });

    socket.addEventListener('error', function(event) {
        console.log('error');
        let status = document.getElementById('connection-status');
        status.innerHTML = 'Disonnected';
        status.classList.add('disconnected');
        status.classList.remove('connected');
        setTimeout(function() {
            connect();
        }, 1000);
    });

    socket.addEventListener('close', function(event) {
        console.log('close');
        let status = document.getElementById('connection-status');
        status.innerHTML = 'Disonnected';
        status.classList.add('disconnected');
        status.classList.remove('connected');
        setTimeout(function() {
            connect();
        }, 1000);
    });

    socket.addEventListener('message', function(event) {
        let messages = document.getElementById('messages');
        messages.innerHTML = event.data + '<br/>' + messages.innerHTML;
    });
}

function shoot() {
    let spawnId = parseInt(document.getElementById('shoot-spawn-id').value, 10);
    console.log("shoot: ", spawnId);
    socket.send(JSON.stringify({
        type: 'shoot',
        data: {
            spawn_id: spawnId,
            user_id: 1
        }
    }));
}


function session() {
    let userId = parseInt(document.getElementById('session-user-id').value, 10);
    console.log("session: ", userId);
    socket.send(JSON.stringify({
        type: 'session_start',
        data: {
            user_id: userId,
        }
    }));
}

connect();
