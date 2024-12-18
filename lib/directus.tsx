import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus('https://directus-internal.dicedvo.org/').with(rest());

export default directus;