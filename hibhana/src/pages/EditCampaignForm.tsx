import { useState, useEffect } from 'react';
import { useCampaigns } from '../context/CampaignContext';
import { updateCampaign } from '../services/firestore';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Loader2, Upload, X, Copy } from 'lucide-react';

type EditCampaignFormProps = {
  campaignId: string;
  onSuccess?: () => void;
};

export default function EditCampaignForm({ campaignId, onSuccess }: EditCampaignFormProps) {
  const { campaigns, refreshCampaigns } = useCampaigns();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
  const [link, setLink] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the campaign to edit
  useEffect(() => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setTitle(campaign.title || '');
      setDescription(campaign.description || '');
      setStartDate(campaign.startDate || '');
      setEndDate(campaign.endDate || '');
      setImage(campaign.image || '');
      setImagePublicId(campaign.imagePublicId || '');
      setLink(campaign.link || '');
    }
  }, [campaignId, campaigns]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hibhana_uploads');

    try {
      setIsUploading(true);
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImage(data.secure_url);
        setImagePublicId(data.public_id);
        toast.success('Image uploaded successfully');
      }
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

  const copyImageUrl = () => {
    navigator.clipboard.writeText(image);
    toast.success('Image URL copied to clipboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const updatedData = {
        title,
        description,
        startDate,
        endDate,
        image,
        imagePublicId,
        ...(link ? { link } : {}), // Only include link if it exists
      };

      await updateCampaign(campaignId, updatedData);
      toast.success('Campaign updated successfully');
      refreshCampaigns();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast.error('Failed to update campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summer Sale"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enjoy our summer collection with special discounts"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="link">Campaign Link (Optional)</Label>
        <Input
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="/collections/summer"
        />
      </div>

      <div>
        <Label htmlFor="image">Campaign Image</Label>
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
                alt="Campaign"
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
                  <Copy className="h-4 w-4" />
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
            Updating Campaign...
          </>
        ) : (
          'Update Campaign'
        )}
      </Button>
    </form>
  );
}