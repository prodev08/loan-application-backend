import { Request } from 'express';
import NodeCache from 'node-cache';

export const cacher = new NodeCache({ 
  stdTTL: parseInt(process.env.CACHE_TTL || '1200'),
  checkperiod: parseInt(process.env.CACHE_CHECK || '120'),
}); // by default cache is valid for 20 mins, is checked every 2 minues

export const getCacheKeyFromReq = (controllerName: string,req: Request) => {
  const queryKey = JSON.stringify(req.query);
  const bodyKey = JSON.stringify(req.body);
  return `${controllerName}-${queryKey}${bodyKey}`;
}