import icons from '@/lib/icons';

// Load and cache icon sprite
const url = '/assets/media/icons.svg';
const ttl = process.env.NODE_ENV === 'production' ? 1000 * 60 * 60 * 24 : 0;

icons(url, ttl);
