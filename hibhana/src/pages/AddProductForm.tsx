import { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { addProduct } from '../services/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useToast } from '../components/ui/use-toast';
import { Textarea } from '../components/ui/textarea';

type ProductFormData = {
  name: string;
  price: string;
  featured: boolean;
  collections: boolean;
  collectionType: string;
  description: string;
  image: string;
  indianWear: boolean;
  westernWear: boolean;
};

export function AddProductForm() {
  const { categories } = useCategories();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    featured: false,
    collections: false,
    collectionType: '',
    description: '',
    image: '',
    indianWear: false,
    westernWear: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.description) {
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
        category: formData.collections
          ? formData.collectionType.toLowerCase().replace(/\s+/g, '-')
          : '',

      });

      toast({
        title: 'Product added successfully',
        description: 'The product has been saved to the database.',
      });

      setFormData({
        name: '',
        price: '',
        featured: false,
        collections: false,
        collectionType: '',
        description: '',
        image: '',
        indianWear: false,
        westernWear: false,
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
          required
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
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter product description"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
        />
        <Label htmlFor="featured">Featured Product</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="collections"
          checked={formData.collections}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, collections: checked }))
          }
        />
        <Label htmlFor="collections">Show in Collections</Label>
      </div>

      {formData.collections && (
        <div className="space-y-2">
          <Label htmlFor="collectionType">Collection Category</Label>
          <Select
            value={formData.collectionType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, collectionType: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a collection category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 🔴 NEW TOGGLES START HERE */}
      <div className="flex items-center space-x-2">
        <Switch
          id="indianWear"
          checked={formData.indianWear}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, indianWear: checked }))
          }
        />
        <Label htmlFor="indianWear">Show under Indian Wear</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="westernWear"
          checked={formData.westernWear}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, westernWear: checked }))
          }
        />
        <Label htmlFor="westernWear">Show under Western Wear</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="Paste full image URL here"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
            Adding Product...
          </>
        ) : (
          'Add Product'
        )}
      </Button>
    </form>
  );
}
