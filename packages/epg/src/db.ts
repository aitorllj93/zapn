
import slugify from "slugify";

import { Category, Channel, EPG } from "./types";
import { createCache } from "./cache";
import { parseChannelsXMLFile, parseEPGXMLFile } from "./parser";

const GUIDES_CACHE_KEY = 'guides';

const getCategoryCacheKey = (category: string) => `${GUIDES_CACHE_KEY}:${category}`;


type EPGFilterParams = {
  /** @deprecated */
  provider?: string[]|string;
  category?: string[]|string;
};

export const createEPGRepository = (
  channelsPath: string,
  guidesPath: string,
) => {
  let categories: Map<string, string>;
  const cache = createCache<EPG>();
  let loaded = false;

  const load = async () => {
    if (loaded) {
      return;
    }

    const channels = await parseChannelsXMLFile(channelsPath);
    const guide = await parseEPGXMLFile(guidesPath, channels);

    if (!guide) {
      throw new Error('Unable to load guide');
    }

    categories = new Map(guide.channels.map(c => c.category ? [slugify(c.category, { lower: true, strict: true }), c.category] : undefined).filter(Boolean) as [string, string][]);

    await cache.set(GUIDES_CACHE_KEY, guide);

    for (const [categorySlug, categoryLabel] of categories.entries()) {
      const channels = guide.channels.filter(c => c.category === categoryLabel);
      const programs = guide.programs.filter(p => channels.some(c => c.uuid === p.channelUuid));
      await cache.set(getCategoryCacheKey(categorySlug), {
        channels,
        programs,
      });
    }

    loaded = true;
  }

  return {
    async getCategories(): Promise<Category[]> {
      await load();

      return Array.from(categories.entries()).map(([slug, label]) => ({ slug, label }))
    },
    async getGuide(filter?: EPGFilterParams): Promise<EPG|undefined> {
      await load();

      if (!filter?.category) {
        const guide = await cache.get(GUIDES_CACHE_KEY);

        return guide;
      }


      const guides = await this.getGuides(filter);

      return guides.reduce((acc, cur) => {
        acc.channels.push(
          ...cur.channels
        );
        acc.programs.push(
          ...cur.programs
        );
        return acc;
      }, {
        channels: [],
        programs: [],
      } as EPG);
    },
    async getGuides(filter?: EPGFilterParams): Promise<EPG[]> {
      await load();

      const filterCategories = typeof filter?.category === 'string' ? [filter.category] : filter?.category;
      const categoryKeys = Array.from(categories.keys()).filter(c => filterCategories?.includes(c));

      const guides = await Promise.all(
        categoryKeys
          .map(c => cache.get(getCategoryCacheKey(c)))
      );

      return guides.filter(Boolean) as EPG[];
    },
    async getGuidesAsCategories(filter?: EPGFilterParams): Promise<EPG[]> {
      await load();

      const filterCategories = typeof filter?.category === 'string' ? [filter.category] : filter?.category;
      const categoryKeys = Array.from(categories.keys()).filter(c => filterCategories ? filterCategories.includes(c) : true);

      const groups = await Promise.all(
        categoryKeys.map(async (key) => {
          const epg = await cache.get(getCategoryCacheKey(key));

          if (!epg) {
            return undefined;
          }

          return {
            ...epg,
            key,
            label: categories.get(key),
          }
        })
      )

      return groups.filter(Boolean) as EPG[];
    },
    async getChannels(filter?: EPGFilterParams) {
      await load();

      const guides = await this.getGuides(filter);

      return guides.flatMap(g => g.channels);
    }
  }
}