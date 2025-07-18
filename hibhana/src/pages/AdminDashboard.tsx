import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { Button } from "../components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CategoryProvider } from "../context/CategoryContext";
import { CampaignProvider } from "../context/CampaignContext";
import { AddProductForm } from "./AddProductForm";
import { AddCampaignForm } from "./AddCampaignForm";
import CampaignList from "./CampaignList";
import EditCampaignForm from "./EditCampaignForm";
import ProductList from "./ProductList";
import EditProductForm from "./EditProductForm";
import AdminCategoryPage from "./AdminCategoryPage";
import { DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { AddSlideForm } from "../components/AddSlideForm";
import HeroSlideList from "../components/HeroSlideList";



const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCampaignId, setEditCampaignId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="heroSlides">Home Page Slides</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>


            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Products Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Product</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">

                    {/* ✅ Custom Close Button (styled, safe) */}
                    <DialogClose asChild>
                      <button
                        className="absolute right-4 top-4 text-gray-400 hover:text-hibhana-gold font-bold text-xl transition"
                      >
                        <X className="w-6 h-6" />
                        <span className="sr-only">Close</span>
                      </button>
                    </DialogClose>

                    {/* Your existing header and form */}
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
              <AdminCategoryPage />
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

            <TabsContent value="heroSlides" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Hero Slides</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Slide</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Hero Slide</DialogTitle>
                    </DialogHeader>
                    <AddSlideForm />
                  </DialogContent>
                </Dialog>
              </div>
              <HeroSlideList />
            </TabsContent>
          </Tabs>
        </div>
      </CampaignProvider>
    </CategoryProvider>
  );
};

export default AdminDashboard;