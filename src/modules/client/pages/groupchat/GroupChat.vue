<template>
    <!-- Main container -->
    <div id="main" class="container p-2 mt-5 mh-100">
    
        <!-- Login container-->
        <div class="row m-2" id="login">
            <form id="loginForm" class="col-12 p-0">

                <div class="row m-0">
                <!-- <div class="col-6 row m-0 p-0">
                    <input type="text" class="col-8 form-control " id="brokerHost" placeholder="host" disabled required>
                    <input type="number" class="col-3 form-control ml-1" id="brokerPort" placeholder="TCP port" disabled required>
                </div> -->

                    <div class="col-6 p-0 d-flex flex-row justify-content-end input-group">
                        <input v-model="user" type="text" class="form-control" id="user" placeholder="Choose a nickname" required/>
                        <!-- <input type="text" class="form-control" id="user" placeholder="Choose a nickname" disabled required/> -->
                        <div class="input-group-append">
                            <button @click="clickConnetion" id="connectBtn" type="button" class="btn btn-primary">Connect</button>
                            <button @click="clickDesconnetion" id="disconnectBtn" type="button" class="btn btn-secondary">Disconnect</button>
                            <!-- <button id="connectBtn" type="button" class="btn btn-primary" disabled>Connect</button>
                            <button id="disconnectBtn" type="button" class="btn btn-secondary" disabled>Disconnect</button> -->
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- Chat window -->
        <div class="row m-2" id="chat">
            <!-- Users container -->
            <div class="card col-2 p-0">
                <div class="card-header p-1">Connected Users</div>
                <div id='usersListCard' class="card-body p-1">
                    <ul id="usersList" class="list-group mh-100">
                        <li v-for="(user, index) in listUsers" :key="index">
                            {{ user }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Messages container -->
            <div class="card col-10 p-0">
                <div class="card-header p-1 d-flex justify-content-between">
                    <p class="m-0">Messages</p>
                    <button @click="clearMessages" id="clearMessages" class="p-0 btn btn-secondary btn-sm bi bi-trash-fill"/>
                </div>
                <div id="messages" class="card-body p-1">
                    <div v-for="(msg, index) in listMessages" :key="index" class="text-info">
                        {{ msg }}
                    </div>
                </div>
            </div>

        </div>

        <!-- Send message container -->
        <div class="row m-2">
            <div class="col-12 input-group p-0">
                <input v-model="msg" type="text" class="form-control" id="sendMessage" placeholder="Write message...">
                <!-- <input type="text" class="form-control" disabled id="sendMessage" placeholder="Write message..."> -->
                <div class="input-group-append">
                    <button @click="sendMessage" id="replyBtn" class="btn btn-outline-primary" type="submit">Reply</button>
                    <!-- <button id="replyBtn" class="btn btn-outline-primary" disabled type="submit">Reply</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { publishMQTT, subscriberMQTT } from "@/plugins/mqtt";

export default {
    name: 'GroupChat',
    data() {
        return {
            listUsers: [],
            listMessages: [],
            user: '',
            msg: ''
        } 
    },
    methods: {
        clickConnetion() {
            console.log('conectar')
            this.listUsers.push(this.user)
            localStorage.setItem('list', JSON.stringify(this.listUsers))
            
            publishMQTT('new_conexion', this.user)
            this.user = ''
        },
        clickDesconnetion() {
            console.log('desconectar')
            // desconectar el usuario actual
        },
        sendMessage() {
            console.log('enviar msg')
            this.listMessages.push(this.msg)
            localStorage.setItem('msg', JSON.stringify(this.listUsers))
            //publishMQTT('new_msg_chat', this.user)
            this.msg = ''
        },
        clearMessages() {
            console.log('limpiar msg')
        }
    },
    mounted() {
        let users = localStorage.getItem('list') || []
        let msgs = localStorage.getItem('msg') || []
        console.log('users: ', users)
        console.log('msgs: ', msgs)

        if ( users.length !== 0 ) this.listUsers = JSON.parse(users)

        if ( msgs.length !== 0 ) this.listMessages = JSON.parse(msgs)
       

        subscriberMQTT("groupchat", 'new_conexion', (data) => {
            console.log('llega esto: ', data)
            if ( this.listUsers.length != 0 ) {
                let exits = true
                this.listUsers.map( item => {
                    console.log('item: ', item)
                    if (item === data) exits = false
                })
                if (exits) this.listUsers.push(data)
            } else {
                this.listUsers.push(data)
            }
            localStorage.setItem('list', JSON.stringify(this.listUsers))
            console.log('lista: ', this.listUsers)
        });
        /* subscriberMQTT("chat", this.chatKey, (message) => {
            this.addMessageBottom(JSON.parse(message));
        }); */
        //publishMQTT('nw_new_video_call', JSON.stringify(dataUserSendVideoCall))
    }
}
</script>

<style scoped>
.loggedUser {
  color:orange;
}

.otherUser {
  color: darkgreen
}

/* #main {
  height: 30em;
} */

#usersList, #messages {
  overflow-y: auto;
  height: 25em;
}
</style>
