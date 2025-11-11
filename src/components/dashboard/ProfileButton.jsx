import { UserButton } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../../context/ThemeContext.jsx";

const ProfileButton = () => {
	const { darkMode } = useTheme();

	return (
		<UserButton
			appearance={{
				baseTheme: darkMode ? dark : undefined,
				elements: {
					avatarBox: "w-10 h-10",
				}
			}}
			afterSignOutUrl="/"
		/>
	);
};

export default ProfileButton;
