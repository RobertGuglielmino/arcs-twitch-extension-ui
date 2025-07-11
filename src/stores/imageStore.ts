// imageStore.ts - Single file solution
import { useState, useEffect, useCallback } from "react";

// Types
type ImageMap = Record<string, string>;
type ImageNamespace =
  | "CAMPAIGN_IMAGES"
  | "APP_IMAGES"
  | "GAME_IMAGES"
  | "COURT_IMAGES"
  | "EDICT_IMAGES"
  | "LAW_IMAGES"
  | "FATES_IMAGES";

interface LoadedImage {
  src: string;
  element: HTMLImageElement;
  isLoaded: boolean;
  isError: boolean;
}

// Simple singleton store
class SimpleImageStore {
  private static instance: SimpleImageStore;
  private loadedImages = new Map<string, LoadedImage>();
  private subscribers = new Set<() => void>();
  private config: Record<ImageNamespace, ImageMap> = {
    CAMPAIGN_IMAGES: {},
    APP_IMAGES: {},
    COURT_IMAGES: {},
    GAME_IMAGES: {},
    EDICT_IMAGES: {},
    LAW_IMAGES: {},
    FATES_IMAGES: {},
  };

  static getInstance() {
    if (!SimpleImageStore.instance) {
      SimpleImageStore.instance = new SimpleImageStore();
    }
    return SimpleImageStore.instance;
  }

  // Initialize config with your barrel exports
  initializeConfig(config: Record<ImageNamespace, ImageMap>) {
    this.config = { ...config };
  }

  private ensureConfig(namespace: ImageNamespace) {
    if (Object.keys(this.config[namespace]).length === 0) {
      console.warn(
        `${namespace} not initialized. Call initializeConfig first.`
      );
    }
  }

  private getImageKey(namespace: ImageNamespace, imageName: string): string {
    return `${namespace}:${imageName}`;
  }

  private notify() {
    this.subscribers.forEach((callback) => callback());
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  async preloadImage(namespace: ImageNamespace, imageName: string) {
    this.ensureConfig(namespace);

    const imageKey = this.getImageKey(namespace, imageName);
    if (this.loadedImages.has(imageKey)) return;

    const src = this.config[namespace][imageName];
    if (!src) {
      console.warn(`Image not found: ${imageName} in ${namespace}`);
      return;
    }

    // Set loading state
    this.loadedImages.set(imageKey, {
      src,
      element: new Image(),
      isLoaded: false,
      isError: false,
    });
    this.notify();

    try {
      const element = new Image();
      await new Promise((resolve, reject) => {
        element.onload = resolve;
        element.onerror = reject;
        element.src = src;
      });

      this.loadedImages.set(imageKey, {
        src,
        element,
        isLoaded: true,
        isError: false,
      });
    } catch (error) {
      this.loadedImages.set(imageKey, {
        src,
        element: new Image(),
        isLoaded: false,
        isError: true,
      });
    }
    this.notify();
  }

  async preloadImages(namespace: ImageNamespace, imageNames: string[]) {
    const promises = imageNames.map((name) =>
      this.preloadImage(namespace, name)
    );
    await Promise.allSettled(promises);
  }

  getImageSrc(namespace: ImageNamespace, imageName: string): string {
    this.ensureConfig(namespace);

    const imageKey = this.getImageKey(namespace, imageName);
    const loaded = this.loadedImages.get(imageKey);

    if (loaded?.isLoaded) {
      return loaded.src;
    }

    return this.config[namespace][imageName] || "";
  }

  isImageLoaded(namespace: ImageNamespace, imageName: string): boolean {
    const imageKey = this.getImageKey(namespace, imageName);
    return this.loadedImages.get(imageKey)?.isLoaded || false;
  }

  isImageLoading(namespace: ImageNamespace, imageName: string): boolean {
    const imageKey = this.getImageKey(namespace, imageName);
    const image = this.loadedImages.get(imageKey);
    return image !== undefined && !image.isLoaded && !image.isError;
  }

  getLoadingState(namespace: ImageNamespace) {
    const images = Array.from(this.loadedImages.entries()).filter(([key]) =>
      key.startsWith(`${namespace}:`)
    );

    const loaded = images.filter(([, img]) => img.isLoaded).length;
    const total = images.length;
    const isLoading = images.some(([, img]) => !img.isLoaded && !img.isError);

    return { loaded, total, isLoading };
  }
}

// Enhanced useImageBus hook (drop-in replacement)
export function useImageBus(namespace: ImageNamespace) {
  const [, setUpdateTrigger] = useState(0);
  const store = SimpleImageStore.getInstance();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setUpdateTrigger((prev) => prev + 1);
    });
    return unsubscribe;
  }, [store]);

  const getImageSrc = useCallback(
    (imageName: string): string => {
      return store.getImageSrc(namespace, imageName);
    },
    [store, namespace]
  );

  const preloadImage = useCallback(
    async (imageName: string): Promise<void> => {
      return store.preloadImage(namespace, imageName);
    },
    [store, namespace]
  );

  const preloadImages = useCallback(
    async (imageNames: string[]): Promise<void> => {
      return store.preloadImages(namespace, imageNames);
    },
    [store, namespace]
  );

  const isImageLoaded = useCallback(
    (imageName: string): boolean => {
      return store.isImageLoaded(namespace, imageName);
    },
    [store, namespace]
  );

  const isImageLoading = useCallback(
    (imageName: string): boolean => {
      return store.isImageLoading(namespace, imageName);
    },
    [store, namespace]
  );

  const loadingState = store.getLoadingState(namespace);

  return {
    // Your existing API
    getImageSrc,
    isLoading: loadingState.isLoading,

    // New preloading features
    preloadImage,
    preloadImages,
    isImageLoaded,
    isImageLoading,
    loadingState,
  };
}

// Utility hook for data-driven preloading
export function useImagePreloader() {
  const store = SimpleImageStore.getInstance();

  const preloadFromData = useCallback(
    async (data: any) => {
      const promises: Promise<void>[] = [];

      // Example: preload based on data structure
      promises.push(store.preloadImages("FATES_IMAGES", data.fateAssets));
      promises.push(store.preloadImages("APP_IMAGES", data.appAssets));
      promises.push(store.preloadImages("COURT_IMAGES", data.courtAssets));
      promises.push(
        store.preloadImages("CAMPAIGN_IMAGES", data.campaignAssets)
      );
      promises.push(store.preloadImages("EDICT_IMAGES", data.edictAssets));
      promises.push(store.preloadImages("LAW_IMAGES", data.lawAssets));
      promises.push(store.preloadImages("FATES_IMAGES", data.fateAssets));

      await Promise.allSettled(promises);
    },
    [store]
  );

  return { preloadFromData };
}

// Initialize the store with your barrel exports
export function initializeImageStore(config: Record<ImageNamespace, ImageMap>) {
  const store = SimpleImageStore.getInstance();
  store.initializeConfig(config);
}
