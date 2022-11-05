import LoginWindow from './loginWindow.js';
import MainWindow from './mainWindow.js';
import UserName from './userName.js';
import UserList from './userList.js';
import MessageList from './messageList.js';
import MessageSender from './messageSender.js';
import WSClient from './wsClient.js';
import UserPhoto from './userPhoto.js';


export default class Chat {
    constructor() {
        this.wsClient = new WSClient(
            "ws://localhost:8282",
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
            userPhoto: new UserPhoto(
                document.querySelector('[data-role=user-photo]'),
                this.onUpload.bind(this)
            ),
        };

        this.ui.loginWindow.show();
    }

    onUpload(data) {
        this.ui.userPhoto.set(data);

        fetch(`http://localhost:8282/upload-photo`, {
            method: 'post',
            body: JSON.stringify({
                name: this.ui.userName.get(),
                image: data,
            })
        });
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
        this.ui.userPhoto.set(`./photos/${name}.png?t=${Date.now()}`);
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
        } else if (type === 'photo-changed') {
            const avatars = document.querySelectorAll(
                `[data-role=user-avatar][data-user=${data.name}]`
            );

            for (const avatar of avatars) {
                avatar.style.backgroundImage = `url('./photos/${data.name}.png?t=${Date.now()}')`;
            }
        }
    }
}
