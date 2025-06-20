import { useState } from 'react';
import { addCampaign } from '../services/firestore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../components/ui/use-toast';
import { Loader2, Upload, X, Copy, Check } from 'lucide-react';
import axios from 'axios';

type CampaignFormData = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  imagePublicId: string;
  link?: string; // Optional campaign link field
};

export function AddCampaignForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    image: '',
    imagePublicId: '',
    link: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    setImageUploading(true);
    
    try {
      const url = 'https://api.cloudinary.com/v1_1/dkthq8qoy/image/upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Hibana');
      
      const response = await axios.post(url, formData);
      
      setFormData(prev => ({
        ...prev,
        image: response.data.secure_url,
        imagePublicId: response.data.public_id
      }));
      
      toast({
        title: 'Image uploaded',
        description: 'Your image has been uploaded successfully.',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: 'There was an error uploading your image.',
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
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
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate || !formData.image) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    setLoading(true);
    try {
      await addCampaign({
        ...formData,
      });
      
      toast({
        title: 'Campaign added',
        description: 'Your campaign has been added successfully.',
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        image: '',
        imagePublicId: '',
        link: ''
      });
    } catch (error) {
      console.error('Error adding campaign:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error adding your campaign.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Campaign Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Summer Collection 2023"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your campaign..."
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="link">Campaign Link (Optional)</Label>
        <Input
          id="link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="/collections/summer"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Campaign Image</Label>
        {!formData.image ? (
          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="campaign-image"
              disabled={imageUploading}
            />
            <Label
              htmlFor="campaign-image"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {imageUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm font-medium text-gray-500">
                    Click to upload an image
                  </span>
                </>
              )}
            </Label>
          </div>
        ) : (
          <div className="relative rounded-md overflow-hidden">
            <img
              src={formData.image}
              alt="Campaign preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4 mr-1" /> Remove
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={copyImageUrl}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" /> Copy URL
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Campaign...
          </>
        ) : (
          'Add Campaign'
        )}
      </Button>
    </form>
  );
}