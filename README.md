# Sentinel SDK

Module development kit for **OSINT Sentinel Workstation** — write plugins
that run inside the Workstation's cockpit without needing the engine
source.

> **Contract, not implementation.** This SDK exposes the module
> interface and the external API — what a plugin can call, never how the
> engine works underneath.

## What you can build

A module (plugin) is a single object implementing `EarthEnginePlugin`:
it registers with the globe, renders entities/controls, reacts to scene
changes, and detaches cleanly. Modules live in the cockpit's module
panel alongside the built-in ones.

See [`sdk/earth-engine-plugin.d.ts`](sdk/earth-engine-plugin.d.ts) for
the full contract and [`examples/hello-overlay`](examples/hello-overlay/)
for a minimal working module.

## What you get access to

- **Globe context** — the Cesium viewer for entities, primitives, camera
- **Scene context** — shared scene state (camera, selection, layers)
- **Workstation API** — the same capability surface the built-in
  modules use (typed namespaces over the Sentinel API)
- **Inspector controls** — declarative UI: buttons, toggles, sliders,
  selects, inputs, displays — the panel renders them for you

## The API surface

The workstation also exposes an authenticated local API (see
[`api/API.md`](api/API.md)) — usable from external tools, scripts, and
remote clients, not just in-app modules.

## Submitting a module

Modules are reviewed before inclusion in a build — see
[`docs/SUBMISSION.md`](docs/SUBMISSION.md). Basic/community modules are
welcome; the flagship modules remain developed in-house.

## License

SDK and module submissions are covered under the Visentrix licensing
model — see [`LICENSE`](LICENSE).
