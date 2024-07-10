import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false }); // Update state correctly
      return;
    }

    try {
      const docRef = doc(db, "users", uid); // Get reference to the user's document
      const docSnap = await getDoc(docRef); // Fetch the user's document from Firestore
      if (docSnap.exists()) {
        set((state) => ({ ...state, currentUser: docSnap.data(), isLoading: false })); // Update store with user data
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      set({ currentUser: null, isLoading: false });
    }
  }
}));
