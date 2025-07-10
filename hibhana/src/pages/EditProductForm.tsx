import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCategories } from "../context/CategoryContext";
import { updateProduct } from "../services/firestore";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Upload, X, Loader2, Check, Copy } from "lucide-react";
import axios from "axios";

type EditProductFormProps = {
  productId: string;
  onSuccess?: () => void;
};

export default function EditProductForm({ productId, onSuccess }: EditProductFormProps) {
  const { products, refreshProducts } = useProducts();
  const { categories } = useCategories();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [collections, setCollections] = useState(false);
  const [indianWear, setIndianWear] = useState(false);
  const [westernWear, setWesternWear] = useState(false);
  const [collectionType, setCollectionType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load selected product
  useEffect(() => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setName(product.name || "");
      setPrice(product.price?.toString() || "");
      setCategory(product.category || "");
      setFeatured(product.featured || false);
      setCollections(product.collections || false);
      setIndianWear(product.indianWear || false);
      setWesternWear(product.westernWear || false);
      setCollectionType(product.collectionType || "");
      setDescription(product.description || "");
      setImage(product.image || "");
    }
  }, [productId, products]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Hibana");

      const res = await axios.post("https://api.cloudinary.com/v1_1/dkthq8qoy/image/upload", formData);
      setImage(res.data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const copyImageUrl = async () => {
    await navigator.clipboard.writeText(image);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedData = {
        name,
        price: Number(price),
        category,
        featured,
        collections,
        indianWear,
        westernWear,
        collectionType,
        description,
        image, // ✅ no imagePublicId
      };

      await updateProduct(productId, updatedData);
      toast.success("Product updated successfully");
      refreshProducts();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      {/* Price */}
      <div>
        <Label htmlFor="price">Price (₹)</Label>
        <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>

      {/* Category Dropdown */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.title}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" checked={featured} onCheckedChange={(v) => setFeatured(v as boolean)} />
          <Label htmlFor="featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="collections" checked={collections} onCheckedChange={(v) => setCollections(v as boolean)} />
          <Label htmlFor="collections">In Collection</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="indian" checked={indianWear} onCheckedChange={(v) => setIndianWear(v as boolean)} />
          <Label htmlFor="indian">Indian Wear</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="western" checked={westernWear} onCheckedChange={(v) => setWesternWear(v as boolean)} />
          <Label htmlFor="western">Western Wear</Label>
        </div>
      </div>

      {/* Collection Type */}
      <div>
        <Label htmlFor="collectionType">Collection Type</Label>
        <Input
          id="collectionType"
          placeholder="e.g. Formal Blazer"
          value={collectionType}
          onChange={(e) => setCollectionType(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label>Product Image</Label>
        {!image ? (
          <div className="border-2 border-dashed p-6 rounded-md flex flex-col items-center">
            <label className="cursor-pointer text-center">
              <Upload className="mx-auto text-gray-400" />
              <p className="text-sm mt-2">
                {isUploading ? "Uploading..." : "Upload Image"}
              </p>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
            {isUploading && <Loader2 className="h-6 w-6 animate-spin mt-2" />}
          </div>
        ) : (
          <div className="relative">
            <img src={image} alt="Preview" className="max-h-64 rounded" />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button type="button" variant="destructive" size="icon" onClick={handleRemoveImage}>
                <X className="h-4 w-4" />
              </Button>
              <Button type="button" variant="secondary" size="icon" onClick={copyImageUrl}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Product"
        )}
      </Button>
    </form>
  );
}
