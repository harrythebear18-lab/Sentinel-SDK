# OSINT Sentinel Workstation

An offline-first geospatial intelligence runtime for Windows and macOS.
A semi-photorealistic 3D Earth — but not a static globe view. Live feeds,
multispectral satellite analysis, terrain compute, local AI, and
multi-user ops sessions all operate on the same shared scene:
programmable, not just rendered.

This repository is the **public home** of the project: downloads,
documentation, issue tracking, and community. Development happens in a
private repository; releases and docs are published here.

![OSINT Sentinel Workstation cockpit — 3D globe with live Argo buoy network, satellite orbital tracks, grouped plugin panel, and entity inspector](docs/screenshots/cockpit.png)

---

## Download

Grab the latest build from
[**Releases**](https://github.com/harrythebear18-lab/Osint-Sentinal-Workstation-OP/releases):

| File | What it is |
|------|------------|
| `OSINT Sentinel Workstation Setup x.y.z.exe` | Windows installer (x64 + arm64) |
| `OSINT Sentinel Workstation x.y.z.exe` | Windows portable — no install, run anywhere |

**Requirements:** Windows 10/11, a GPU with up-to-date drivers, ~4 GB
free disk. An internet connection is needed for live feeds and fresh
imagery — everything already cached keeps working offline.

## What it does

- **A real analysis globe** — 3D Earth with high-resolution base imagery,
  historic imagery releases going back to 2014, terrain-aware overlays.
- **Multispectral satellite analysis** — Sentinel-2 ingestion with
  vegetation, water, and burn indices rendered on the globe.
- **Terrain intelligence** — elevation, slope, hillshade, runoff and
  flood-path modeling, watershed divides, anomaly detection.
- **Live global picture** — satellites, aircraft, vessels, earthquakes,
  wildfires, lightning, storms, volcanic activity, space weather,
  road traffic.
- **Mission & SAR tooling** — search zones, last-known-point rings,
  behavior profiles, terrain-aware routing, GeoJSON/KML/KMZ export.
- **Local AI** — scene-aware assistant and image search running on your
  own machine. Nothing leaves unless you allow it.
- **Hardware-accelerated compute** — heavy analysis dispatches to your
  GPU and CPU vector units automatically, with graceful fallback.
- **Offline-first** — imagery and terrain caches keep working with no
  network; caches are bounded so they can't eat your disk.
- **Ops sessions** — host a shared scene for other workstations on your
  network. Participants keep their own cameras; shared state syncs.
  Joining uses a session PIN — persistent device pairing is a separate,
  explicit approval.
- **Privacy-first** — staged security model controls what network and
  location data is exposed. No telemetry unless you enable it.

## Modules — 44 across 12 domains

Every module below ships in the base install and is covered by the free
tier today. Names are as they appear in the in-app module panel.

**Terrain & Hydrology**

- **Slope Bands** — DEM-derived slope analysis rendered as terrain bands
- **Hillshade** — DEM-derived hillshade overlay for terrain reading
- **Hydrology** — runoff flow paths, pooling, flood risk, watershed divides
- **Anomaly Detection** — terrain depressions, prominences, and outliers
- **Acoustic Propagation** — outdoor sound propagation modeling over terrain

**Satellite Imagery & Vegetation**

- **Sentinel-2 STAC/COG** — real multispectral Sentinel-2 band ingestion
- **Band Math** — vegetation, water, and burn indices (NDVI/NDWI/NBR)
- **Canopy / Vegetation** — vegetation intelligence and canopy analysis

**Mapping & Routing**

- **Roads** — vector road and trail network overlay
- **Routes** — least-cost pathfinding with terrain-aware walking speed
- **Water** — streams, rivers, lakes, and springs

**Mission & SAR**

- **Search Zones** — probability-weighted last-known-point search rings
- **Behavior Engine** — multi-agent terrain simulation
- **Hiker Profile** — psychological and perceptual calibration
- **Rest Points** — behavior-model shelter/rest scoring
- **Fall Risk** — slope, curvature, edge, and weather hazard grids
- **Remains Corridor** — downhill flow modeling from a fall point
- **Case Profiles** — incident management and case organization
- **Predictions** — severe weather, storm tracks, SST anomalies, precipitation

**Live Tracking**

- **Aircraft** — live ADS-B flight tracking with heading orientation
- **Vessels** — AIS maritime tracking
- **Earthquakes** — USGS 24-hour significant quake feed
- **Fires** — NASA FIRMS active fire detections
- **Lightning** — real-time lightning detections
- **Road Traffic** — live traffic flow overlay
- **Volcanoes** — global volcano monitoring with live feeds + simulation
- **Weather** — precipitation radar and point forecasts

**Climate & Space**

- **Climate Stations** — buoys, Argo floats, weather and CO₂ stations
- **Storms** — active tropical cyclones and forecast tracks
- **Space Weather** — solar flares, solar wind, Kp index, aurora

**Infrastructure & Network**

- **Infrastructure** — airports, power plants, substations, sensors
- **Grid Assets** — power generation, data centers, interconnects
- **Network Connections** — live connection map with GeoIP arcs

**AI & Intelligence**

- **Vision** — scene-aware analysis of what you're looking at, on local AI
- **CLIP** — image embeddings and visual similarity search over tiles
- **Detection Overlay** — screen-space boxes over tracked objects
- **Web Search** — intelligence augmentation via web lookup

**Media & Export**

- **Drone Footage** — extract and georeference frames from drone video
- **Export / Import** — GeoJSON, KML, and KMZ in and out
- **Timelapse Export** — satellite imagery timelapse to video

**History & Context**

- **History & Research** — classified historic sites from open data
- **World Detail** — procedural surface detail for close-range views

**Immersive**

- **VR** — headset rendering via OpenXR (e.g. Quest over PC Link)

**System**

- **HAL Benchmark** — measures GPU, SIMD, and worker throughput on your hardware

## Editions

The workstation is free to use as a base - modules/plugins are subject to re-evaluation after the first 12 months of existence as of - 22 September 2026 - 
| Tier | What you get |
|------|--------------|
| **Free** | The full current feature set, permanently |
| **Trial** | 14 days of everything including premium modules — automatic on install, refreshes with each release |
| **Pro / Enterprise** | License key unlocks premium modules as they ship |

The app never locks you out — if a trial ends, you keep the free tier.
Keys are activated in-app under **LICENSE** in the toolbar.

## Get help / get involved

- [Report a bug](../../issues/new?template=bug_report.yml)
- [Request a feature](../../issues/new?template=feature_request.yml)
- [Ask a question](../../issues/new?template=question.yml)
- [GitHub Discussions](../../discussions) — ideas, Q&A, show-and-tell
- [Discord](https://discord.gg/visentrix)

See [SUPPORT.md](SUPPORT.md) for details. To report a security
vulnerability privately, see [SECURITY.md](SECURITY.md).

## License

Proprietary — see [LICENSE](LICENSE). The Workstation uses a layered
licensing model: the cockpit surface is designed for plugin-ecosystem
growth, while the Core Engine remains protected. A plugin SDK and public
API surface are planned — watch this repo.

---

© 2026 Visentrix. All rights reserved.
