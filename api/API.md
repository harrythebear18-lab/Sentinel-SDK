# Sentinel API

The Workstation exposes an authenticated local JSON-RPC + WebSocket API
on port **9777** for external tools, scripts, and remote clients.

```
POST http://127.0.0.1:9777/rpc      { "method": "scene.flyTo", "params": {...}, "id": 1 }
GET  http://127.0.0.1:9777/health   → { ok, version, uptimeSec, gated }
WS   ws://127.0.0.1:9777/events     → pushed events: { type:"event", topic, ts, data }
```

## Auth

- **Loopback** — open by default (or `SENTINEL_API_TOKEN` if set).
- **LAN devices** — must pair first: `POST /pair {"deviceName": "…"}` →
  the operator approves in-app → poll `GET /pair/status?id=…` → returns
  an `api`-scoped bearer token. Send it as `Authorization: Bearer <tok>`
  or `?token=<tok>`.
- **Stage gate** — API methods answer only when the app's security stage
  is at NETWORK (stage 3) or above; `/health` always answers.

## Methods

| Method | What it does |
|---|---|
| `scene.get` / `scene.setContext` | Read/patch the shared scene state |
| `scene.flyTo` / `scene.zoomToGlobe` / `scene.setViewHeight` | Camera moves |
| `scene.setSelection` / `scene.clearSelection` / `scene.describeViewport` | Selection + viewport introspection |
| `terrain.demSample` / `terrain.demProfile` | Elevation at a point / along a path |
| `terrain.slopeAnalysis` / `terrain.anomalyAnalysis` | Terrain analysis over a region |
| `terrain.runoff` | Rainfall→runoff hydrology. Params: `{ bounds, rainfallMm, durationHours? }` — returns flow paths, pools, flood zones, watershed divides, the flow-accumulation grid, rainfall intensity (mm/hr), and a flash-flood flag when storm duration is below the catchment's time of concentration |
| `terrain.canopy` / `terrain.behavior` | Vegetation cover, agent sim |
| `mission.searchZones` / `mission.restPoints` / `mission.routePlan` | SAR planning |
| `mission.fallRisk` / `mission.remainsCorridor` | Hazard modeling |
| `mission.tripDerive` / `mission.hikerCalibrate` | Trip params + subject calibration |
| `water.fetch` / `roads.fetch` / `infrastructure.fetch` / `history.sites` | OSM data layers |
| `plugins.list/activate/deactivate/toggle/stats/control` | Module management |
| `compute.dispatch` / `compute.capabilities` | Hardware-accelerated compute dispatch |
| `data.run` | Analyst-engine action passthrough |
| `feeds.current` | Snapshot of all live features |
| `export.geojson` / `export.kml` | Headless export to file |
| `api.peers` / `api.revokePeer` | Manage paired devices |
| `api.methods` | List every available method |
| `ipc.invoke` / `ipc.send` | IPC passthrough — `{ channel, args }` routed to the app's own handler registry, gated by the same namespace allowlist the preload enforces. Powers the remote thin client |

## Remote thin client (web-remote)

The built workstation UI is served from the API itself — open
`http://<host>:9777/globe/` in any browser on the LAN (LAN mode requires
`SENTINEL_API_LAN=1`). The served shell injects `/web-api.js`, which
provides the same typed `window.api` surface as the desktop preload —
`invoke`/`send` ride `/rpc` passthrough, `on` subscribes to `/events`,
and typed arrays cross as base64 markers both directions. First-use 401
auto-runs the pairing ceremony — approve the device in-app, the client
stores the token and reconnects.

## Events

Connect to `/events`, optionally send `{"subscribe": ["topic", …]}` or
`"*"` — every pushed update arrives as
`{ "type": "event", "topic": "<channel>", "ts": <ms>, "data": … }`.

Topics mirror the app's live channels: live feeds (aircraft, vessels,
earthquakes, fires, lightning), climate/storms/space-weather, grid,
network, scene context changes, and more.
