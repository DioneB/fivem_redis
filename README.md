<h1 align="center">

![Banner](https://raw.githubusercontent.com/Santagain/fivem_redis/main/banner.png)

</h1>

<h4 align="center">A RedisDB Wrapper for FiveM</h4>

<p align="center">
  <a href="#API">API</a> •
  <a href="#Wiki">Wiki</a> •
  <a href="#License">License</a> •
  <a href="#Roadmap">Roadmap</a> •
  <a href="#Contribute">Contribute</a>
</p>

## API

How to use FiveM_Redis API

```lua
[[Get Redis Reference]]

local Cache = exports.fivem_redis:GetInterface();

[[Methods]]

-- Save data on Redis Cache
Cache.Save(key, value)

-- Get data from Redis Cache
Cache.GetCache(key, function(result)
  print(result)
end)

-- Remove data with informed key from Redis Cache
Cache.Invalidate(key)

-- Invalidate all data with informed prefix from Redis Cache
Cache.InvalidatePrefix(prefix, function(result)
  print(result)
end)

```




## Wiki

- See [Install Instructions](https://github.com/Santagain/fivem_redis/wiki) for detailed Instructions for install and use of Redis & RediSearch.

## Roadmap

- Find on our [roadmap](https://github.com/Santagain/fivem_redis/projects/1) the next steps of the project.

## Contribute

- Want to contribute? [Follow these recommendations](https://github.com/Santagain/fivem_redis/blob/main/CONTRIBUTING.md).
