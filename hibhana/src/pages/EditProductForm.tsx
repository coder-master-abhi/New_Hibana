import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';
import { updateProduct } from '../services/firestore';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Loader2, Upload, X, Copy, Check } from 'lucide-react';
import axios from 'axios';

type EditProductFormProps = {
  productId: string;
  onSuccess?: () => void;
};

export default function EditProductForm({ productId, onSuccess }: EditProductFormProps) {
  const { products, refreshProducts } = useProducts();
  const { categories } = useCategories();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find the product to edit
  useEffect(() => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setName(product.name || '');
      setPrice(product.price?.toString() || '');
      setCategory(product.category || '');
      setFeatured(product.featured || false);
      setImage(product.image || '');
      setImagePublicId(product.imagePublicId || '');
    }
  }, [productId, products]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const url = 'https://api.cloudinary.com/v1_1/dkthq8qoy/image/upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Hibana');
      
      const response = await axios.post(url, formData);
      
      setImage(response.data.secure_url);
      setImagePublicId(response.data.public_id);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setImagePublicId('');
  };

  const copyImageUrl = async () => {
    await navigator.clipboard.writeText(image);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const updatedData = {
        name,
        price: Number(price),
        category,
        featured,
        image,
        imagePublicId,
      };

      await updateProduct(productId, updatedData);
      toast.success('Product updated successfully');
      refreshProducts();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Elegant Ring"
          required
        />
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="99.99"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={featured}
          onCheckedChange={(checked) => setFeatured(checked as boolean)}
        />
        <Label htmlFor="featured">Featured Product</Label>
      </div>

      <div>
        <Label htmlFor="image">Product Image</Label>
        <div className="mt-1">
          {!image ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
              <label className="cursor-pointer flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  {isUploading ? 'Uploading...' : 'Upload an image'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                  disabled={isUploading}
                />
              </label>
              {isUploading && <Loader2 className="h-6 w-6 animate-spin mt-2" />}
            </div>
          ) : (
            <div className="relative">
              <img
                src={image}
                alt="Product"
                className="max-h-64 rounded-md mx-auto"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={copyImageUrl}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || isUploading}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating Product...
          </>
        ) : (
          'Update Product'
        )}
      </Button>
    </form>
  );
}