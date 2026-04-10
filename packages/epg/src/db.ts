
import { Channel, EPG, EPGRepository } from "./types";
import { createCache } from "./cache";
import { loadDirectory } from "./watcher";

const GUIDES_CACHE_KEY = 'guides';

export const createEPGRepository = (
  dir: string
): EPGRepository => {
  const cache = createCache<EPG[]>();

  return {
    async getGuide(filter) {
      const guides = await this.getGuides();

      const filterProviders = typeof filter?.provider === 'string' ? [filter.provider] : filter?.provider;

      let result: EPG = {
        channels: [],
        programs: [],
      }

      for (const guide of guides) {
        if (filterProviders && !filterProviders.includes(guide.provider ?? '')) {
          continue;
        }

        result.channels.push(
          ...guide.channels
        );

        result.programs.push(
          ...guide.programs
        );
      }
      
      return result;
    },
    async getGuides() {
      const cached = await cache.get(GUIDES_CACHE_KEY);

      if (cached) {
        return cached;
      }

      const loaded = await loadDirectory(dir);

      await cache.set(GUIDES_CACHE_KEY, loaded);

      return loaded;
    },
    async getGuidesAsCategories(filter) {
      const guides = await this.getGuides();

      const filterProviders = typeof filter?.provider === 'string' ? [filter.provider] : filter?.provider;

      const categoriesEPGs = new Map<string, EPG>();

      for (const guide of guides) {
        if (filterProviders && !filterProviders.includes(guide.provider ?? '')) {
          continue;
        }

        const categories = new Set(guide.channels.map(c => c.category));

        for (const category of categories) {
          if (!category) {
            continue;
          }

          let epg = categoriesEPGs.get(category);

          if (!epg) {
            epg = {
              channels: [],
              programs: []
            };
            categoriesEPGs.set(category, epg);
          }

          const epgChannels = guide.channels.filter(c => c.category === category);
          const epgPrograms = guide.programs.filter(p => epgChannels.some(c => c.uuid === p.channelUuid));

          epg.channels.push(
            ...epgChannels
          );

          epg.programs.push(
            ...epgPrograms
          );
        }
      }
      
      return Array.from(categoriesEPGs.entries()).map(([label, epg]) => ({
        label,
        epg
      }));
    },
    async getChannels(filter) {
      const channels: Channel[] = []
      const guides = await this.getGuides();

      const filterProviders = typeof filter?.provider === 'string' ? [filter.provider] : filter?.provider;
      
      for (const guide of guides) {
        if (filterProviders && !filterProviders.includes(guide.provider ?? '')) {
          continue;
        }

        channels.push(
          ...guide.channels
        );
      }

      return channels;
    }
  }
}