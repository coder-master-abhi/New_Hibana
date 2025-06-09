import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, storage } from "../lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { addProduct, addCategory, addCampaign } from "@/services/firestore";

const TABS = ["Products", "Categories", "Campaigns"]; 
 
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Products");
  // Product state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", featured: false, image: "", imagePublicId: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  // Category state
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [catForm, setCatForm] = useState({ title: "", description: "" });

  // Campaign state
  const [campaigns, setCampaigns] = useState([]);
  const [campLoading, setCampLoading] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campForm, setCampForm] = useState({ title: "", description: "", startDate: "", endDate: "", images: [], imagePublicIds: [] });
  const [campImageFiles, setCampImageFiles] = useState([]);
  const [campImageUploading, setCampImageUploading] = useState(false);

  // Fetch products from Firestore
  useEffect(() => {
    if (tab === "Products") fetchProducts();
    // eslint-disable-next-line
  }, [tab]);

  const fetchProducts = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const handleProductForm = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setForm({ name: "", price: "", category: "", featured: false, image: "", imagePublicId: "" });
    setImageFile(null);
    setShowProductModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      featured: product.featured || false,
      image: product.image || "",
      imagePublicId: product.imagePublicId || ""
    });
    setImageFile(null);
    setShowProductModal(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dkthq8qoy/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Hibana");
    const response = await axios.post(url, formData);
    return { url: response.data.secure_url, public_id: response.data.public_id };
  };

  // Delete image from Cloudinary via backend
  const deleteImageFromCloudinary = async (public_id) => {
    if (!public_id) return;
    try {
      await axios.post("http://localhost:4000/api/delete-image", { public_id });
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.image;
    let imagePublicId = form.imagePublicId || "";
    if (imageFile) {
      setImageUploading(true);
      // Upload to Cloudinary
      const uploadRes = await uploadToCloudinary(imageFile);
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.public_id;
      setImageUploading(false);
    }
    if (editingProduct) {
      await updateDoc(doc(db, "products", editingProduct.id), {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        featured: form.featured,
        image: imageUrl,
        imagePublicId: imagePublicId
      });
    } else {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        category: form.category,
        featured: form.featured,
        image: imageUrl,
        imagePublicId: imagePublicId
      });
    }
    setShowProductModal(false);
    setImageFile(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    // Find product to get public_id
    const product = products.find(p => p.id === id);
    if (product && product.imagePublicId) {
      await deleteImageFromCloudinary(product.imagePublicId);
    }
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  useEffect(() => {
    if (tab === "Categories") fetchCategories();
    // eslint-disable-next-line
  }, [tab]);

  const fetchCategories = async () => {
    setCatLoading(true);
    const snap = await getDocs(collection(db, "categories"));
    setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setCatLoading(false);
  };

  const handleCategoryForm = (e) => {
    const { name, value } = e.target;
    setCatForm(f => ({ ...f, [name]: value }));
  };

  const openAddCategory = () => {
    setEditingCategory(null);
    setCatForm({ title: "", description: "" });
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat) => {
    setEditingCategory(cat);
    setCatForm({ title: cat.title, description: cat.description });
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      await updateDoc(doc(db, "categories", editingCategory.id), {
        title: catForm.title,
        description: catForm.description
      });
    } else {
      await addCategory({
        title: catForm.title,
        description: catForm.description
      });
    }
    setShowCategoryModal(false);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    fetchCategories();
  };

  useEffect(() => {
    if (tab === "Campaigns") fetchCampaigns();
    // eslint-disable-next-line
  }, [tab]);

  const fetchCampaigns = async () => {
    setCampLoading(true);
    const snap = await getDocs(collection(db, "campaigns"));
    setCampaigns(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setCampLoading(false);
  };

  const handleCampaignForm = (e) => {
    const { name, value } = e.target;
    setCampForm(f => ({ ...f, [name]: value }));
  };

  const openAddCampaign = () => {
    setEditingCampaign(null);
    setCampForm({ title: "", description: "", startDate: "", endDate: "", images: [], imagePublicIds: [] });
    setCampImageFiles([]);
    setShowCampaignModal(true);
  };

  const openEditCampaign = (camp) => {
    setEditingCampaign(camp);
    setCampForm({
      title: camp.title,
      description: camp.description,
      startDate: camp.startDate || "",
      endDate: camp.endDate || "",
      images: camp.images || [],
      imagePublicIds: camp.imagePublicIds || []
    });
    setCampImageFiles([]);
    setShowCampaignModal(true);
  };

  const handleCampImageChange = (e) => {
    if (e.target.files) {
      setCampImageFiles(Array.from(e.target.files));
    }
  };

  const handleCampaignSubmit = async (e) => {
    e.preventDefault();
    let imageUrls = campForm.images || [];
    let imagePublicIds = campForm.imagePublicIds || [];
    if (campImageFiles.length > 0) {
      setCampImageUploading(true);
      imageUrls = [];
      imagePublicIds = [];
      for (const file of campImageFiles) {
        const uploadRes = await uploadToCloudinary(file);
        imageUrls.push(uploadRes.url);
        imagePublicIds.push(uploadRes.public_id);
      }
      setCampImageUploading(false);
    }
    if (editingCampaign) {
      await updateDoc(doc(db, "campaigns", editingCampaign.id), {
        title: campForm.title,
        description: campForm.description,
        startDate: campForm.startDate,
        endDate: campForm.endDate,
        images: imageUrls,
        imagePublicIds: imagePublicIds
      });
    } else {
      await addCampaign({
        title: campForm.title,
        description: campForm.description,
        startDate: campForm.startDate,
        endDate: campForm.endDate,
        images: imageUrls,
        imagePublicIds: imagePublicIds
      });
    }
    setShowCampaignModal(false);
    setCampImageFiles([]);
    fetchCampaigns();
  };

  const handleDeleteCampaign = async (id) => {
    // Find campaign to get public_ids
    const campaign = campaigns.find(c => c.id === id);
    if (campaign && campaign.imagePublicIds && Array.isArray(campaign.imagePublicIds)) {
      for (const publicId of campaign.imagePublicIds) {
        await deleteImageFromCloudinary(publicId);
      }
    }
    await deleteDoc(doc(db, "campaigns", id));
    fetchCampaigns();
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-hibhana-gold/10 to-hibhana-maroon/10">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-4xl border border-hibhana-gold/30 text-center">
        <h1 className="text-4xl font-bold mb-4 text-hibhana-maroon font-playfair">Admin Dashboard</h1>
        <div className="flex justify-center mb-8 gap-4">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded font-semibold border-b-2 transition-colors duration-200 ${tab === t ? "border-hibhana-maroon text-hibhana-maroon" : "border-transparent text-gray-500 hover:text-hibhana-maroon"}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mb-8">
          {tab === "Products" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <Button onClick={openAddProduct}>Add Product</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
                  ) : products.length === 0 ? (
                    <TableRow><TableCell colSpan={6}>No products found.</TableCell></TableRow>
                  ) : products.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>{product.image && <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => openEditProduct(product)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block mb-1 font-medium">Name</label>
                      <Input name="name" value={form.name} onChange={handleProductForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Price</label>
                      <Input name="price" type="number" value={form.price} onChange={handleProductForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Category</label>
                      <select name="category" value={form.category} onChange={handleProductForm} required className="block w-full text-sm">
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.title}>{cat.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="featured" checked={form.featured} onChange={handleProductForm} id="featured" />
                      <label htmlFor="featured">Featured</label>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Product Image</label>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm" />
                      {form.image && !imageFile && (
                        <img src={form.image} alt="Current" className="w-20 h-20 object-cover rounded mt-2" />
                      )}
                      {imageFile && (
                        <div className="mt-2 text-sm text-muted-foreground">{imageFile.name}</div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={imageUploading}>{imageUploading ? "Uploading..." : (editingProduct ? "Update" : "Add")}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
          {tab === "Categories" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Category Management</h2>
                <Button onClick={openAddCategory}>Add Category</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catLoading ? (
                    <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
                  ) : categories.length === 0 ? (
                    <TableRow><TableCell colSpan={3}>No categories found.</TableCell></TableRow>
                  ) : categories.map(cat => (
                    <TableRow key={cat.id}>
                      <TableCell>{cat.title}</TableCell>
                      <TableCell>{cat.description}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => openEditCategory(cat)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block mb-1 font-medium">Title</label>
                      <Input name="title" value={catForm.title} onChange={handleCategoryForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Description</label>
                      <Input name="description" value={catForm.description} onChange={handleCategoryForm} required />
                    </div>
                    <DialogFooter>
                      <Button type="submit">{editingCategory ? "Update" : "Add"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
          {tab === "Campaigns" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Campaign Management</h2>
                <Button onClick={openAddCampaign}>Add Campaign</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Images</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campLoading ? (
                    <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
                  ) : campaigns.length === 0 ? (
                    <TableRow><TableCell colSpan={6}>No campaigns found.</TableCell></TableRow>
                  ) : campaigns.map(camp => (
                    <TableRow key={camp.id}>
                      <TableCell>
                        {camp.images && camp.images.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {camp.images.map((img, idx) => (
                              <img key={idx} src={img} alt={camp.title} className="w-16 h-16 object-cover rounded" />
                            ))}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{camp.title}</TableCell>
                      <TableCell>{camp.description}</TableCell>
                      <TableCell>{camp.startDate}</TableCell>
                      <TableCell>{camp.endDate}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => openEditCampaign(camp)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteCampaign(camp.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCampaign ? "Edit Campaign" : "Add Campaign"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCampaignSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block mb-1 font-medium">Title</label>
                      <Input name="title" value={campForm.title} onChange={handleCampaignForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Description</label>
                      <Input name="description" value={campForm.description} onChange={handleCampaignForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Start Date</label>
                      <Input name="startDate" type="date" value={campForm.startDate} onChange={handleCampaignForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">End Date</label>
                      <Input name="endDate" type="date" value={campForm.endDate} onChange={handleCampaignForm} required />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Campaign Images</label>
                      <input type="file" accept="image/*" multiple onChange={handleCampImageChange} className="block w-full text-sm" />
                      {campForm.images && campForm.images.length > 0 && campImageFiles.length === 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {campForm.images.map((img, idx) => (
                            <img key={idx} src={img} alt="Current" className="w-20 h-20 object-cover rounded" />
                          ))}
                        </div>
                      )}
                      {campImageFiles.length > 0 && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          {campImageFiles.map((file, idx) => file.name).join(", ")}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={campImageUploading}>{campImageUploading ? "Uploading..." : (editingCampaign ? "Update" : "Add")}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="py-2 px-6 bg-hibhana-maroon text-white font-semibold rounded hover:bg-hibhana-gold transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard; 