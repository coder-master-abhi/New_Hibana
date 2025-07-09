import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// ✅ Define types
export type Product = {
  name: string;
  price: number;
  category?: string;
  featured: boolean;
  collections: boolean;
  collectionType?: string;
  description?: string;
  image: string;
  indianWear: boolean;
  westernWear: boolean;
};


export type ProductWithId = Product & { id: string };


export type Category = {
  title: string;
  slug: string;
  image: string;
  description: string;
};

export type Campaign = {
  title: string;
  image: string;
  link?: string;
};

// Add a new product to the 'products' collection
export async function addProduct(productData: Product): Promise<string> {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
}

// ✅ Typed category input
export async function addCategory(categoryData: Category): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), categoryData);
  return docRef.id;
}

// ✅ Typed campaign input
export async function addCampaign(campaignData: Campaign): Promise<string> {
  const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
  return docRef.id;
}

// Delete campaign from the 'campaigns' collection
export async function deleteCampaign(campaignId: string) {
  await deleteDoc(doc(db, 'campaigns', campaignId));
}

// Update campaign in the 'campaigns' collection
export async function updateCampaign(campaignId: string, updatedData: Partial<Campaign>) {
  await updateDoc(doc(db, 'campaigns', campaignId), updatedData);
}

// ✅ Added return type
export async function getAllProducts(): Promise<ProductWithId[]> {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProductWithId[];
}


// Delete a product
export async function deleteProduct(productId: string) {
  await deleteDoc(doc(db, 'products', productId));
}

// Update a product
export async function updateProduct(productId: string, updatedData: Partial<Product>) {
  await updateDoc(doc(db, 'products', productId), updatedData);
}

// ✅ Safely deletes a category by its slug
export async function deleteCategory(slug: string): Promise<void> {
  const snapshot = await getDocs(collection(db, 'categories'));
  const match = snapshot.docs.find(doc => doc.data().slug === slug);

  if (match) {
    await deleteDoc(doc(db, 'categories', match.id));
  } else {
    throw new Error("Category not found");
  }
}

// Update category using slug
export async function updateCategory(slug: string, updatedData: Partial<Category>) {
  const snapshot = await getDocs(collection(db, "categories"));
  const match = snapshot.docs.find(doc => doc.data().slug === slug);
  if (match) {
    await updateDoc(doc(db, "categories", match.id), updatedData);
  } else {
    throw new Error("Category not found for update");
  }
}
// ✅ Fetch all categories