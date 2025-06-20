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

// Delete campaign from the 'campaigns' collection
export async function deleteCampaign(campaignId) {
  await deleteDoc(doc(db, 'campaigns', campaignId));
}

// Update campaign in the 'campaigns' collection
export async function updateCampaign(campaignId, updatedData) {
  await updateDoc(doc(db, 'campaigns', campaignId), updatedData);
}

// Get all products
export async function getAllProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Delete a product
export async function deleteProduct(productId) {
  await deleteDoc(doc(db, 'products', productId));
}

// Update a product
export async function updateProduct(productId, updatedData) {
  await updateDoc(doc(db, 'products', productId), updatedData);
}