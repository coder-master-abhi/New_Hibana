import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption
} from "../components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CategoryProvider } from "../context/CategoryContext";
import { CampaignProvider } from "../context/CampaignContext";
import { AddProductForm } from "./AddProductForm";
import { AddCampaignForm } from "./AddCampaignForm";
import CampaignList from "./CampaignList";
import EditCampaignForm from "./EditCampaignForm";
import ProductList from "./ProductList";
import EditProductForm from "./EditProductForm";
   
import { addCategory, addCampaign } from "../services/firestore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [editCampaignId, setEditCampaignId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCatLoading(true);
    try {
      const snap = await getDocs(collection(db, "categories"));
      setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <CategoryProvider>
      <CampaignProvider>
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button
              variant="outline"
              onClick={() => {
                signOut(auth);
                navigate("/admin/login");
              }}
            >
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Products</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Product</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <AddProductForm />
                  </DialogContent>
                </Dialog>
              </div>

              <ProductList 
                onEditProduct={(productId) => {
                  setEditProductId(productId);
                  setIsEditProductDialogOpen(true);
                }} 
              />
              
              <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                  </DialogHeader>
                  {editProductId && (
                    <EditProductForm 
                      productId={editProductId} 
                      onSuccess={() => {
                        setIsEditProductDialogOpen(false);
                        setEditProductId(null);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Categories Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Category</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Category title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Category description" />
                      </div>
                      <Button type="submit" className="w-full">Add Category</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {catLoading ? (
                <div className="text-center py-4">Loading categories...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.title}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Campaigns Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Campaign</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Campaign</DialogTitle>
                    </DialogHeader>
                    <AddCampaignForm />
                  </DialogContent>
                </Dialog>
              </div>
              
              <CampaignList 
                onEditCampaign={(campaignId) => {
                  setEditCampaignId(campaignId);
                  setIsEditDialogOpen(true);
                }} 
              />
              
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Campaign</DialogTitle>
                  </DialogHeader>
                  {editCampaignId && (
                    <EditCampaignForm 
                      campaignId={editCampaignId} 
                      onSuccess={() => {
                        setIsEditDialogOpen(false);
                        setEditCampaignId(null);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </div>
      </CampaignProvider>
    </CategoryProvider>
  );
};

export default AdminDashboard;