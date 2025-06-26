import { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { addProduct } from '../services/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../components/ui/use-toast';
import { Loader2, Upload, X, Copy, Check } from 'lucide-react';
import axios from 'axios';

type ProductFormData = {
  name: string;
  price: string;
  category: string;
  featured: boolean;
  image: string;
  imagePublicId: string;
};

export function AddProductForm() {
  const { categories } = useCategories();
  console.log("Categories from context:", categories);    // added this line for debugging

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    category: '',
    featured: false,
    image: '',
    imagePublicId: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;
  
  const file = e.target.files[0];
  setImageUploading(true);

  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      
    if (!cloudName || !uploadPreset) {
  toast({
    variant: 'destructive',
    title: 'Missing environment config',
    description: 'Cloudinary config is missing. Check your .env file.',
  });
  setImageUploading(false);
  return;
}
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);

    const response = await axios.post(url, uploadData);

    setFormData(prev => ({
      ...prev,
      image: response.data.secure_url,
      imagePublicId: response.data.public_id
    }));

    toast({
      title: 'Image uploaded successfully',
      description: 'The image has been uploaded to Cloudinary.',
    });
  } catch (error) {
    toast({
      variant: 'destructive',
      title: 'Error uploading image',
      description: 'Please try again later.',
    });
  } finally {
    setImageUploading(false);
  }
};

  const handleDeleteImage = () => {
    setFormData(prev => ({
      ...prev,
      image: '',
      imagePublicId: ''
    }));
  };

  const copyImageUrl = async () => {
    await navigator.clipboard.writeText(formData.image);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.image) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    setLoading(true);
    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price),
      });
      
      toast({
        title: 'Product added successfully',
        description: 'The product has been saved to the database.',
      });
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        category: '',
        featured: false,
        image: '',
        imagePublicId: ''
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error adding product',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter product name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          placeholder="Enter price"
          step="0.01"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
        />
        <Label htmlFor="featured">Featured Product</Label>
      </div>

      <div className="space-y-2">
        <Label>Product Image</Label>
        <div className="border rounded-lg p-4 space-y-4">
          {!formData.image ? (
            <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
              <label className="cursor-pointer flex flex-col items-center space-y-2">
                <div className="p-2 bg-background rounded-full">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="text-sm">Click to upload image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                />
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Product preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Input value={formData.image} readOnly />
                <Button
                  type="button"
                  variant="outline"
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
          {imageUploading && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2 text-sm">Uploading image...</span>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" disabled={loading || imageUploading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Product...
          </>
        ) : (
          'Add Product'
        )}
      </Button>
    </form>
  );
}