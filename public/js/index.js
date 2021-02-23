const peer = new RTCPeerConnection();
const dataChannel = {};

peer.onicecandidate = ev => {
  const elemen = document.getElementById("local-descriptor");

  if (!elemen) {
    return;
  }

  elemen.innerHTML = JSON.stringify(peer.localDescription);
}


function createChannel(label = "channel") {
  const channel = peer.createDataChannel(label);
  dataChannel[channel.id] = channel;
  channel.onmessage = ev => console.log('msg', channel.id, ev.data);
  channel.onopen = ev => console.log(channel.id, 'is open');
}

function listenChannel() {
  peer.ondatachannel = ev => {
    const { channel } = ev;
    dataChannel[channel.id] = channel;
    channel.onmessage = ev => console.log('msg', channel.id, ev.data);
    channel.onopen = ev => console.log(channel.id, 'is open');
  }
}

function createOffer() {
  peer.createOffer().then(offer => peer.setLocalDescription(offer)).then(() => console.log('success create offer'))
}

function createAnswer() {
  peer.createAnswer().then(answer => peer.setLocalDescription(answer)).then(() => console.log('success create answer'))
}