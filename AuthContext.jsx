import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};


export const AuthContextProvider = ({ children }) => {

	const [authUser, setAuthUser] = useState(() => {

		const storedUser = localStorage.getItem("chat-user");

		if (!storedUser) return null;

		const parsedUser = JSON.parse(storedUser);


		return {
			...parsedUser,
			id: parsedUser.user?.id
		};

	});


	return (
		<AuthContext.Provider
			value={{
				authUser,
				setAuthUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};