
import { ENV } from 'varlock/env';
import { createEPGRepository } from "@zapn/epg/index";

const repository = createEPGRepository(ENV.CHANNELS_PATH, ENV.GUIDES_PATH);

export { repository };