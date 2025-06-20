import { useState } from 'react';
import { useCampaigns } from '../context/CampaignContext';
import { deleteCampaign } from '../services/firestore';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, Edit, Loader2 } from 'lucide-react';

type CampaignListProps = {
  onEditCampaign: (campaignId: string) => void;
};

export default function CampaignList({ onEditCampaign }: CampaignListProps) {
  const { campaigns, loading, error, refreshCampaigns } = useCampaigns();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (campaignId: string) => {
    try {
      setDeletingId(campaignId);
      await deleteCampaign(campaignId);
      toast.success('Campaign deleted successfully');
      refreshCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading campaigns...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (campaigns.length === 0) {
    return <div className="text-center p-4">No campaigns found. Create your first campaign!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            {campaign.image ? (
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No image
              </div>
            )}
          </div>
          <CardHeader>
            <CardTitle>{campaign.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">{campaign.description}</p>
            <div className="text-xs text-gray-500">
              <p>Start: {format(new Date(campaign.startDate), 'MMM dd, yyyy')}</p>
              <p>End: {format(new Date(campaign.endDate), 'MMM dd, yyyy')}</p>
              {campaign.link && (
                <p className="mt-2">
                  Link: <span className="text-blue-500">{campaign.link}</span>
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditCampaign(campaign.id)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(campaign.id)}
              disabled={deletingId === campaign.id}
            >
              {deletingId === campaign.id ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}