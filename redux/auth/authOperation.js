// import auth from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOutUser } = authSlice.actions;
/* -------------------------------------------------------------------------- */
/*                       Функція реєстарції користувача                       */
/* -------------------------------------------------------------------------- */
export const authSignUp =
  ({ login, password, email, avatar }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password,);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        photoURL: avatar,
      });
      console.log("user--------->", user);
      const { uid, displayName, photoURL } = await db.auth().currentUser;

      const userUpdateProfile = {
        userId: uid,
        login: displayName,
        avatar: photoURL,
      };
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error.message);
    }
  };
/* -------------------------------------------------------------------------- */
/*                       Функція входу  користувача                           */
/* -------------------------------------------------------------------------- */
export const authSignIn =
  ({ password, email }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().signInWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      
        console.log("user", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };
/* -------------------------------------------------------------------------- */
/*                       Функція виходу  користувача                           */
/* -------------------------------------------------------------------------- */
export const authSignOut = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOutUser());
};

/* -------------------------------------------------------------------------- */
/*                       Функція зміну стану                          */
/* -------------------------------------------------------------------------- */

export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        avatar: user.photoURL,
        
      };
        dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    
   } 
 });
};
