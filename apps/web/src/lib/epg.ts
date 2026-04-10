
import { ENV } from 'varlock/env';
import { createEPGRepository } from "@zapn/epg/index";

const repository = createEPGRepository(ENV.GUIDES_DIR);

export { repository };