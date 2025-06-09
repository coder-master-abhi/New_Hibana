import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


// Add a new product to the 'products' collection
export async function addProduct(productData) {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
}

// Add a new category to the 'categories' collection
export async function addCategory(categoryData) {
  const docRef = await addDoc(collection(db, 'categories'), categoryData);
  return docRef.id;
}

// Add a new campaign to the 'campaigns' collection
export async function addCampaign(campaignData) {
  const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
  return docRef.id;
} 