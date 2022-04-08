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

function SaveCache(key, value,expires) {
  expires => Redis.set(key, JSON.stringify(value), 'EX', expires);
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

function InvalidateCache(key) {
  return Redis.del(key);
}

async function InvalidatePrefixCache(prefix, cb) {
  const keys = await Redis.keys(`${prefix}:*`);
  Callback(cb, Redis.del(keys));
}

let Cache = {};
Cache.Save = SaveCache;
Cache.Invalidate = InvalidateCache;
Cache.Get = (key, cb) => {
  return GetCache(key, cb);
};
Cache.GetAll = (cb) => {
  return GetAllCache(cb);
};
Cache.InvalidatePrefix = (prefix, cb) => {
  return InvalidatePrefixCache(prefix, cb);
};

exports('GetInterface', () => {
  return Cache;
});
