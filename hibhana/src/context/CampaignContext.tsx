import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

type Campaign = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  imagePublicId: string;
  link?: string;
};

type CampaignContextType = {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  refreshCampaigns: () => Promise<void>;
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const snapshot = await getDocs(collection(db, 'campaigns'));
      const campaignsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Campaign[];
      setCampaigns(campaignsData);
    } catch (err) {
      setError('Failed to fetch campaigns');
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const value = {
    campaigns,
    loading,
    error,
    refreshCampaigns: fetchCampaigns,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
}