import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { NodeSSH } from 'node-ssh';

@Injectable()
export class AppService {
  identityFilePath = `/Users/longzhaokun/Desktop/scape-staging-api-Key-ap-southeast-2.pem`;

  constructor() {
    setTimeout(() => {
      console.log('start');
      this.restartSh();
    }, 3000);
  }
  getHello(): string {
    return 'Hello World!';
  }

  restartSh(): void {
    const privateKey = fs.readFileSync(this.identityFilePath);
    const ssh = new NodeSSH();

    ssh
      .connect({
        host: '13.210.218.115',
        username: 'ec2-user',
        privateKey: privateKey.toString('utf-8'),
      })
      .then(() => {
        return ssh.execCommand('sh scape-api/redploy.sh');
      })
      .then((result) => {
        console.log('STDOUT:', result.stdout);
        console.log('STDERR:', result.stderr);
        ssh.dispose();
      })
      .catch((err) => {
        console.error('Error executing redploy.sh:', err);
        ssh.dispose();
      });
  }
}
