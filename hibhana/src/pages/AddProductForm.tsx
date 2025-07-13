import { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { addProduct } from '../services/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '../components/ui/select';
import { useToast } from '../components/ui/use-toast';
import { Textarea } from '../components/ui/textarea';

// Updated type with images[]
type ProductFormData = {
  name: string;
  price: string;
  featured: boolean;
  collections: boolean;
  collectionType: string;
  description: string;
  image: string;
  images: string[];
  indianWear: boolean;
  westernWear: boolean;
  rating: number;
  sizes: string[];
  fabric: string;
  details: string[];
  isNew: boolean;
  isBestSeller: boolean;

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
    images: [''],
    indianWear: false,
    westernWear: false,
    rating: 0,
    sizes: [],
    fabric: '',
    details: [],
    isNew: false,            // ✅ New field
    isBestSeller: false,     // ✅ New field

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
        rating: formData.rating,
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
        images: [''],
        indianWear: false,
        westernWear: false,
        rating: 0,
        sizes: [],
        fabric: '',
        details: [],
        isNew: false,           
        isBestSeller: false,     
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

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addNewImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
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
      {/*  Rating */}
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <Select
          value={formData.rating.toString()}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, rating: parseInt(value) }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select rating (1–5)" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {`${num} Star${num > 1 ? 's' : ''}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* size */}
      <div className="space-y-2">
        <Label>Available Sizes</Label>
        <div className="flex flex-wrap gap-4">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={size}
                checked={formData.sizes.includes(size)}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    sizes: e.target.checked
                      ? [...prev.sizes, value]
                      : prev.sizes.filter((s) => s !== value),
                  }));
                }}
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fabric">Fabric</Label>
        <Input
          id="fabric"
          value={formData.fabric}
          onChange={(e) => setFormData((prev) => ({ ...prev, fabric: e.target.value }))}
          placeholder="e.g. Cotton, Silk, Linen"
        />
      </div>

      <div className="space-y-2">
        <Label>Product Details (bullet points)</Label>
        {formData.details.map((detail, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={detail}
              onChange={(e) => {
                const updated = [...formData.details];
                updated[index] = e.target.value;
                setFormData(prev => ({ ...prev, details: updated }));
              }}
              placeholder={`Detail ${index + 1}`}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                const updated = formData.details.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, details: updated }));
              }}
            >
              ❌
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setFormData(prev => ({ ...prev, details: [...prev.details, ''] }))
          }
        >
          ➕ Add Detail
        </Button>
      </div>
      {/* isNew */}
      <div className="flex items-center space-x-2">
        <Switch
          id="isNew"
          checked={formData.isNew}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isNew: checked }))
          }
        />
        <Label htmlFor="isNew">Show as New Product</Label>
      </div>
      {/* Best seller */}
      <div className="flex items-center space-x-2">
        <Switch
          id="isBestSeller"
          checked={formData.isBestSeller}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isBestSeller: checked }))
          }
        />
        <Label htmlFor="isBestSeller">Show as Best Seller</Label>
      </div>

      {/* ✅ Main Image */}
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

      {/* ✅ Multiple Images */}
      <div className="space-y-2">
        <Label>Other Images (optional)</Label>
        {formData.images.map((img, index) => (
          <Input
            key={index}
            type="url"
            value={img}
            onChange={(e) => handleImageChange(index, e.target.value)}
            placeholder={`Image URL #${index + 1}`}
          />
        ))}
        <Button type="button" variant="outline" onClick={addNewImageField}>
          + Add another image
        </Button>
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
