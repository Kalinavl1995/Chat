import LoginWindow from './loginWindow.js';
import MainWindow from './mainWindow.js';
import UserName from './userName.js';
import UserList from './userList.js';
import MessageList from './messageList.js';
import MessageSender from './messageSender.js';
import WSClient from './wsClient.js';


export default class Chat {
    constructor() {
        this.wsClient = new WSClient(
            `ws://localhost:8282`,
            this.onMessage.bind(this)
        );

        this.ui = {
            loginWindow: new LoginWindow(
                document.querySelector('#login'),
                this.onLogin.bind(this)
            ),
            mainWindow: new MainWindow(
                document.querySelector('#main'),
                this.onLogin.bind(this)
            ),
            userName: new UserName(document.querySelector('[data-role=user-name]')),
            userList: new UserList(document.querySelector('[data-role=user-list]')),
            messageList: new MessageList(document.querySelector('[data-role=message-list]')),
            messageSender: new MessageSender(
                document.querySelector('[data-role=message-sender]'),
                this.onSend.bind(this)
            ),
        };

        this.ui.loginWindow.show();
    }

    onSend(message) {
        this.wsClient.sendTextMessage(message);
        this.ui.messageSender.clear();
    }

    async onLogin(name) {
        await this.wsClient.connect();
        this.wsClient.sendHello(name);
        this.ui.loginWindow.hide();
        this.ui.mainWindow.show();
        this.ui.userName.set(name);
    }

    onMessage({type, from, data}) {

        if(type === 'hello') {
            this.ui.userList.add(from);
            this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
        } else if(type === 'user-list') {
            for (const item of data) {
                this.ui.userList.add(item);
            }
        } else if (type === 'bye-bye') {
            this.ui.userList.remove(from);
            this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
        } else if (type === 'text-message') {
            this.ui.messageList.add(from, data.message);
        }
    }
}
