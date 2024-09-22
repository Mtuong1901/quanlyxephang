import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const loginUser = async (username: string, password: string) => {
    const userCollectionRef = collection(db, 'user');
    const querySnapshot = await getDocs(userCollectionRef);
    const userSnap = querySnapshot.docs.find((doc) => doc.data().username === username);
    if (userSnap!==undefined) {
        const userdata = userSnap.data();
        console.log('User data: ', userdata);
        const storedPassword = userdata.password;
        if (storedPassword === password) {
            return 'Login successful';
        } else {
            throw new Error('Sai mật khẩu hoặc tên đăng nhập');
        }
    } else {
        throw new Error('Sai mật khẩu hoặc tên đăng nhập');
    }
};
