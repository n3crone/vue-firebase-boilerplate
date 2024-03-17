import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase';

export const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export const testCollection = collection(db, 'testCollection');
