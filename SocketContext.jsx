import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};


export const SocketContextProvider = ({ children }) => {

	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const { authUser } = useAuthContext();


	useEffect(() => {

		const userId = authUser?.user?.id;

		if (!userId) {
			return;
		}


		console.log(
			"Socket User ID:",
			userId
		);


		const newSocket = io(
			"https://api.rgoalsapp.com",
			{
				query: {
					userId
				}
			}
		);


		setSocket(newSocket);


		newSocket.on(
			"getOnlineUsers",
			(users) => {

				console.log(
					"Online Users:",
					users
				);

				setOnlineUsers(users);
			}
		);



		return () => {

			console.log(
				"Closing socket"
			);

			newSocket.close();
			setSocket(null);

		};


	}, [authUser]);



	return (
		<SocketContext.Provider
			value={{
				socket,
				onlineUsers
			}}
		>
			{children}
		</SocketContext.Provider>
	);

};