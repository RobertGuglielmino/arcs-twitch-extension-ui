
import { FATES_IMAGES } from "@assets/campaign/fates";
import { GAME_IMAGES } from "@assets/game";
import { APP_IMAGES } from "@/assets/app";
import { COURT_IMAGES } from "@/assets/campaign/court";
import { CAMPAIGN_IMAGES } from "@/assets/campaign";

// imageCache.ts - Singleton cache outside React
const imageCache = new Map<string, Record<string, HTMLImageElement>>();
const loadingPromises = new Map<string, Promise<Record<string, HTMLImageElement>>>();

// useImageBus.ts
import { useState, useEffect } from 'react';


const IMAGE_SOURCES = {
  APP_IMAGES,
  CAMPAIGN_IMAGES,
  FATES_IMAGES,
  GAME_IMAGES,
  COURT_IMAGES,
} as const;

type ImageSourceKey = keyof typeof IMAGE_SOURCES;

interface UseImageBusReturn {
  images: Record<string, HTMLImageElement>;
  isLoading: boolean;
  error: string | null;
  getImageSrc: (key: string) => string;
  preloadAll: () => Promise<void>;
}

export const useImageBus = (sourceKey: ImageSourceKey): UseImageBusReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, forceUpdate] = useState({});

  const loadImageSource = async (key: ImageSourceKey): Promise<Record<string, HTMLImageElement>> => {
    // Check if already cached
    if (imageCache.has(key)) {
      return imageCache.get(key)!;
    }

    // Check if already loading
    if (loadingPromises.has(key)) {
      return loadingPromises.get(key)!;
    }

    const imageSource = IMAGE_SOURCES[key];
    
    const loadPromise = (async () => {
      const imagePromises = Object.entries(imageSource).map(([imageKey, src]) => {
        return new Promise<[string, HTMLImageElement]>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve([imageKey, img]);
          img.onerror = () => reject(new Error(`Failed to load image: ${imageKey}`));
          img.src = src as string;
        });
      });

      const results = await Promise.all(imagePromises);
      const imagesRecord = Object.fromEntries(results);
      
      // Cache the results globally
      imageCache.set(key, imagesRecord);
      loadingPromises.delete(key);
      
      return imagesRecord;
    })();

    loadingPromises.set(key, loadPromise);
    return loadPromise;
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await loadImageSource(sourceKey);
        
        setIsLoading(false);
        forceUpdate({}); // Force re-render to show loaded images
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
        setIsLoading(false);
      }
    };

    loadImages();
  }, [sourceKey]);

  // Preload all image sources
  const preloadAll = async (): Promise<void> => {
    const keys = Object.keys(IMAGE_SOURCES) as ImageSourceKey[];
    await Promise.all(keys.map(key => loadImageSource(key)));
  };

  // Get original URL for use in img tags
  const getImageSrc = (key: string): string => {
    const imageSource = IMAGE_SOURCES[sourceKey];
    return imageSource[key as keyof typeof imageSource] as string;
  };

  const cachedImages = imageCache.get(sourceKey) || {};

  return {
    images: cachedImages,
    isLoading,
    error,
    getImageSrc,
    preloadAll,
  };
};

// Optional: Utility hook to preload all images at app startup
export const useImagePreloader = () => {
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadError, setPreloadError] = useState<string | null>(null);

  const preloadAllImages = async () => {
    setIsPreloading(true);
    setPreloadError(null);
    
    try {
      const keys = Object.keys(IMAGE_SOURCES) as ImageSourceKey[];
      const promises = keys.map(async (key) => {
        const imageSource = IMAGE_SOURCES[key];
        const imagePromises = Object.entries(imageSource).map(([imageKey, src]) => {
          return new Promise<[string, HTMLImageElement]>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve([imageKey, img]);
            img.onerror = () => reject(new Error(`Failed to load image: ${imageKey}`));
            img.src = src as string;
          });
        });
        
        const results = await Promise.all(imagePromises);
        const imagesRecord = Object.fromEntries(results);
        imageCache.set(key, imagesRecord);
        
        return imagesRecord;
      });
      
      await Promise.all(promises);
      setIsPreloading(false);
    } catch (err) {
      setPreloadError(err instanceof Error ? err.message : 'Failed to preload images');
      setIsPreloading(false);
    }
  };

  return {
    preloadAllImages,
    isPreloading,
    preloadError,
  };
};