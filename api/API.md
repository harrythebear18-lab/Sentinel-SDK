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

## compute.dispatch

`compute.dispatch { task, payload }` → `ComputeResult`. The HAL picks the
backend — you never choose it: `webgpu` → `wasm-simd` → `cpu-worker` →
`cpu-inline` → `noop`. Below 16384 cells (128²) the dispatcher stays on
CPU — GPU dispatch overhead isn't worth it.

Tasks: `slope`, `hillshade`, `anomaly`, `runoff`, `ndvi`, `ndwi`, `nbr`,
`color-transform`, `scatter`. All except `runoff` have GPU kernels —
priority-flood is sequential by design and stays on the CPU plane.

Payload:

| Field | Type | Notes |
|---|---|---|
| `width`, `height` | number | grid dims (required) |
| `input` | Float32Array | primary grid: elevation, band, frame |
| `input2`, `input3` | Float32Array | multi-band / secondary grids |
| `params` | Float32Array | kernel params — slope: `[cellSizeX, cellSizeY]`; hillshade: `[azimuth, altitude]`; anomaly: `[threshold]`; scatter: `[w,s,e,n,seed,densityScale,maxPerCell,realClasses,hasDem]` |
| `cellSizeX`, `cellSizeY` | number | metres, for slope/runoff |
| `ramp` | Float32Array | color-transform: packed `[v0,r0,g0,b0, v1,…]` |
| `residentKey` | string | **v0.1.3+** — uploads the input at `residentSlot` into a VRAM-resident texture once; later kernels sample it instead of re-uploading. Key must uniquely identify grid contents. Ignored on CPU backends |
| `residentSlot` | number | which input `residentKey` applies to (default 0 = `input`) |
| `outputKey` | string | **v0.1.3+** — output stays GPU-resident under this key; pass the same key as `residentKey` on a later dispatch to chain kernels with no RAM round-trip |
| `readback` | boolean | default true; `false` skips readback for pure-residency products |

Result: `{ output: Float32Array, backend, durationMs, task, width,
height, resident? }` — `backend` tells you which plane actually ran;
`resident: true` means the output stayed on-GPU under `outputKey`
(`output` will be empty — the data is the residency, not the buffer).

`compute.capabilities` → `{ webgpu, cpuWorker, wasmSimd, webcodecs }`.

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
