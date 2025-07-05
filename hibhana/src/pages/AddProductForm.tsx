import { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { addProduct } from '../services/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../components/ui/use-toast';

type ProductFormData = {
  name: string;
  price: string;
  category: string;
  featured: boolean;
  collections: boolean;
  image: string;
};

export function AddProductForm() {
  const { categories } = useCategories();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    category: '',
    featured: false,
    collections: false,
    image: ''
  });

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
        collections: false,
        image: ''
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

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="Paste full image URL here"
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
