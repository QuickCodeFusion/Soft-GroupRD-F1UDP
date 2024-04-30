import { assert } from 'chai';
import io from 'socket.io-client';
import { startWebSocketServer, stopWebSocketServer } from '../support/websocketServerSupport';

describe('WebSocket Server', function() {
  let socket: SocketIOClient.Socket;

  before(async function() {
    // Start WebSocket server
    await startWebSocketServer(3000);
  });

  after(async function() {
    // Close WebSocket server
    await stopWebSocketServer();
  });

  beforeEach(function(done) {
    // Connect to WebSocket server
    socket = io.connect('http://localhost:3000');
    socket.on('connect', () => {
      done();
    });
  });

  afterEach(function(done) {
    // Disconnect from WebSocket server
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  it('should receive positions when participants data is emitted', function(done) {
    // Simulate emitting participants data
    const testData = {
      participants: [
        { name: 'Racer 1', raceNumber: 1 },
        { name: 'Racer 2', raceNumber: 2 },
        // Add more participants as needed
      ]
    };
    server.emit('participantsData', testData);

    // Listen for positions event
    socket.on('positions', function(positions: any[]) {
      assert.isArray(positions);
      assert.equal(positions.length, testData.participants.length);
      assert.deepEqual(positions[0], { name: 'Racer 1', position: 1 });
      assert.deepEqual(positions[1], { name: 'Racer 2', position: 2 });
      // Add more assertions as needed
      done();
    });
  });
});
