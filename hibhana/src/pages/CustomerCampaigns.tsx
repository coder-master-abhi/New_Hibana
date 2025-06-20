import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

import { Loader2 } from 'lucide-react';

type Campaign = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  link?: string;
};

export default function CustomerCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all campaigns from Firestore
        const campaignsSnapshot = await getDocs(collection(db, 'campaigns'));
        const allCampaigns = campaignsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Campaign[];
        
        // Filter campaigns by date (active campaigns only)
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const activeCampaigns = allCampaigns.filter(campaign => {
          return campaign.startDate <= today && campaign.endDate >= today;
        });
        
        setCampaigns(activeCampaigns);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCampaigns();
  }, []);

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
    return null; // Don't show anything if no active campaigns
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Current Promotions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden h-full flex flex-col">
            {campaign.image && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Additional content can go here */}
            </CardContent>
            {campaign.link && (
              <CardFooter>
                <a href={campaign.link} className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </a>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}