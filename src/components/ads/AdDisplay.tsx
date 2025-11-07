'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Megaphone } from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'sidebar' | 'popup' | 'footer';
  position: 'header' | 'sidebar' | 'footer' | 'home' | 'product';
  imageUrl?: string;
  linkUrl?: string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
}

interface AdDisplayProps {
  position: 'header' | 'sidebar' | 'footer' | 'home' | 'product';
  className?: string;
}

export default function AdDisplay({ position, className = '' }: AdDisplayProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [visibleAds, setVisibleAds] = useState<Ad[]>([]);
  const [dismissedAds, setDismissedAds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadAds();
  }, []);

  useEffect(() => {
    filterAndDisplayAds();
  }, [ads, position, dismissedAds]);

  const loadAds = () => {
    const savedAds = localStorage.getItem('biharAcharAds');
    if (savedAds) {
      try {
        const allAds = JSON.parse(savedAds);
        setAds(allAds);
      } catch (error) {
        console.error('Error loading ads:', error);
      }
    }
  };

  const filterAndDisplayAds = () => {
    const now = new Date();
    const filtered = ads.filter(ad => {
      // Check if ad is active
      if (ad.status !== 'active') return false;
      
      // Check if ad is within date range
      const startDate = new Date(ad.startDate);
      const endDate = new Date(ad.endDate);
      if (now < startDate || now > endDate) return false;
      
      // Check if ad matches position
      if (ad.position !== position && ad.position !== 'home') return false;
      
      // Check if ad is dismissed
      if (dismissedAds.has(ad.id)) return false;
      
      return true;
    });

    // Track impressions
    filtered.forEach(ad => {
      if (ad.impressions >= 0) {
        updateAdImpressions(ad.id);
      }
    });

    setVisibleAds(filtered);
  };

  const updateAdImpressions = (adId: string) => {
    const savedAds = localStorage.getItem('biharAcharAds');
    if (savedAds) {
      try {
        const allAds = JSON.parse(savedAds);
        const updatedAds = allAds.map((ad: Ad) => 
          ad.id === adId ? { ...ad, impressions: ad.impressions + 1 } : ad
        );
        localStorage.setItem('biharAcharAds', JSON.stringify(updatedAds));
      } catch (error) {
        console.error('Error updating impressions:', error);
      }
    }
  };

  const updateAdClicks = (adId: string) => {
    const savedAds = localStorage.getItem('biharAcharAds');
    if (savedAds) {
      try {
        const allAds = JSON.parse(savedAds);
        const updatedAds = allAds.map((ad: Ad) => 
          ad.id === adId ? { ...ad, clicks: ad.clicks + 1 } : ad
        );
        localStorage.setItem('biharAcharAds', JSON.stringify(updatedAds));
      } catch (error) {
        console.error('Error updating clicks:', error);
      }
    }
  };

  const handleAdClick = (ad: Ad) => {
    updateAdClicks(ad.id);
    if (ad.linkUrl) {
      window.open(ad.linkUrl, '_blank');
    }
  };

  const dismissAd = (adId: string) => {
    setDismissedAds(prev => new Set([...prev, adId]));
  };

  const renderAd = (ad: Ad) => {
    const baseClasses = "relative bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-all duration-300";
    
    if (ad.type === 'banner' && (position === 'header' || position === 'home')) {
      return (
        <div key={ad.id} className={`${baseClasses} ${className}`}>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-6 w-6 p-0"
            onClick={() => dismissAd(ad.id)}
          >
            <X className="w-3 h-3" />
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Megaphone className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{ad.title}</h3>
                <p className="text-sm text-gray-600">{ad.description}</p>
              </div>
            </div>
            {ad.linkUrl && (
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => handleAdClick(ad)}
              >
                Learn More
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (ad.type === 'sidebar' && position === 'sidebar') {
      return (
        <div key={ad.id} className={`${baseClasses} ${className}`}>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-6 w-6 p-0"
            onClick={() => dismissAd(ad.id)}
          >
            <X className="w-3 h-3" />
          </Button>
          <div className="text-center">
            {ad.imageUrl ? (
              <img 
                src={ad.imageUrl} 
                alt={ad.title}
                className="w-full h-32 object-cover rounded mb-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Megaphone className="w-12 h-12 text-orange-600 mx-auto mb-3" />
            )}
            <h3 className="font-semibold text-gray-800 mb-2">{ad.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{ad.description}</p>
            {ad.linkUrl && (
              <Button
                size="sm"
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => handleAdClick(ad)}
              >
                View Offer
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (ad.type === 'footer' && position === 'footer') {
      return (
        <div key={ad.id} className={`${baseClasses} ${className}`}>
          <div className="flex items-center justify-center space-x-4">
            <Megaphone className="w-5 h-5 text-orange-600" />
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">{ad.title}</h3>
              <p className="text-sm text-gray-600">{ad.description}</p>
            </div>
            {ad.linkUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAdClick(ad)}
              >
                Details
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (ad.type === 'popup') {
      return (
        <div key={ad.id} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => dismissAd(ad.id)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="text-center">
              {ad.imageUrl ? (
                <img 
                  src={ad.imageUrl} 
                  alt={ad.title}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Megaphone className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{ad.title}</h3>
              <p className="text-gray-600 mb-4">{ad.description}</p>
              {ad.linkUrl && (
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => handleAdClick(ad)}
                >
                  Get Offer
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (visibleAds.length === 0) return null;

  return (
    <>
      {visibleAds.map(ad => renderAd(ad))}
    </>
  );
}