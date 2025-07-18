import { db } from '../lib/firebase';
import {collection, getDocs,addDoc, updateDoc, deleteDoc,doc, query, where, getDoc,} from 'firebase/firestore';

// ✅ Define types
export type Product = {
  name: string;
  price: number;
  category?: string;
  featured: boolean;
  collections: boolean;
  collectionType?: string;
  description?: string;
  image: string;           // ✅ used in ProductCard
  images?: string[];       // ✅ used in ProductGallery
  details?: string[];      // ✅ used in ProductInfo
  indianWear: boolean;
  westernWear: boolean;
  rating?: number;
  sizes?: string[];
  fabric?: string;
  isNew?: boolean; // ✅ used in ProductInfo
  isBestSeller?: boolean; // ✅ used in ProductInfo
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

// ✅ Add a new product
export async function addProduct(productData: Product): Promise<string> {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
}

// ✅ Get all products
export async function getAllProducts(): Promise<ProductWithId[]> {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProductWithId[];
}

// ✅ Delete a product
export async function deleteProduct(productId: string) {
  await deleteDoc(doc(db, 'products', productId));
}

// ✅ Update a product
export async function updateProduct(productId: string, updatedData: Partial<Product>) {
  await updateDoc(doc(db, 'products', productId), updatedData);
}

// ✅ Get product by ID (used in Product.tsx)
export async function getProductById(id: string): Promise<ProductWithId | null> {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProductWithId;
  }
  return null;
}

// ✅ Get related products by category excluding current product
export async function getRelatedProducts(id: string, category: string): Promise<ProductWithId[]> {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('category', '==', category));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .filter(doc => doc.id !== id)
    .map(doc => ({ id: doc.id, ...doc.data() } as ProductWithId));
}

// ✅ Add a new category
export async function addCategory(categoryData: Category): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), categoryData);
  return docRef.id;
}

// ✅ Delete category by slug
export async function deleteCategory(slug: string): Promise<void> {
  const snapshot = await getDocs(collection(db, 'categories'));
  const match = snapshot.docs.find(doc => doc.data().slug === slug);

  if (match) {
    await deleteDoc(doc(db, 'categories', match.id));
  } else {
    throw new Error('Category not found');
  }
}

// ✅ Update category by slug
export async function updateCategory(slug: string, updatedData: Partial<Category>) {
  const snapshot = await getDocs(collection(db, 'categories'));
  const match = snapshot.docs.find(doc => doc.data().slug === slug);
  if (match) {
    await updateDoc(doc(db, 'categories', match.id), updatedData);
  } else {
    throw new Error('Category not found for update');
  }
}

// ✅ Add a campaign
export async function addCampaign(campaignData: Campaign): Promise<string> {
  const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
  return docRef.id;
}

// ✅ Delete a campaign
export async function deleteCampaign(campaignId: string) {
  await deleteDoc(doc(db, 'campaigns', campaignId));
}

// ✅ Update a campaign
export async function updateCampaign(campaignId: string, updatedData: Partial<Campaign>) {
  await updateDoc(doc(db, 'campaigns', campaignId), updatedData);
}
