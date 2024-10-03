import { removeUser, getUsers } from "../models/user.model.js"


export const handleDisconnect = (socket, uuid) => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
    console.log('Current Users: ', getUsers());
}