import io from 'socket.io-client';

const socket = io("https://backen-api-residuos.herokuapp.com");

export default socket;