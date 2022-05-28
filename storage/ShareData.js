import { Share } from "react-native";

const ShareLinkHandler = async (message) => {
    try {
        await Share.share({
            message: message.toString(),
        });

    } catch (error) {
        console.log(error.message);
    }
}
export default ShareLinkHandler;