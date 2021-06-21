const IORedis = require('ioredis');

const Redis = new IORedis({
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0,
});

function Callback(cb, ...args) {
  if (typeof cb === 'function') return setImmediate(() => cb(...args));
  else return false;
}

function saveCache(key, value) {
  return Redis.set(key, JSON.stringify(value));
}

async function GetCache(key, cb) {
  const data = await Redis.get(key);
  Callback(cb, data ? JSON.parse(data) : null);
}

async function GetAllCache(cb) {
  const data = await Redis.keys('*');
  Callback(cb, data ? data : null);
}

function invalidateCache(key) {
  return Redis.del(key);
}

async function invalidatePrefixCache(prefix, cb) {
  const keys = await Redis.keys(`${prefix}:*`);
  Callback(cb, Redis.del(keys));
}

let Cache = {};
Cache.saveCache = saveCache;
Cache.Invalidate = invalidateCache;
Cache.GetCache = (key, cb) => {
  return GetCache(key, cb);
};
Cache.GetAllCache = (cb) => {
  return GetAllCache(cb);
};
Cache.invalidatePrefixCache = (cb) => {
  return invalidatePrefixCache(cb);
};

exports('GetInterface', () => {
  return Cache;
});
