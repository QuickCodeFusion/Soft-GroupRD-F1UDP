import { Server } from 'http';
import { server } from 'spec';

export function startWebSocketServer(port: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const httpServer: Server = server.listen(port, () => {
      resolve();
    });
  });
}

export function stopWebSocketServer(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    server.(() => {
      resolve();
    })
  });
}
