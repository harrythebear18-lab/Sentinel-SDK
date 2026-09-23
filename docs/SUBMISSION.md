# Module submission & lifecycle

## Shape

A module is a **single file** (JS or TS) exporting a class/object that
implements `EarthEnginePlugin` (see `sdk/earth-engine-plugin.d.ts`):

- `register(ctx)` — attach to the globe, create entities, subscribe
- `unregister()` — remove everything you created; modules must clean up
- `update(ctx)` — react to scene changes (optional)
- `getStats()` / `getControls()` / `onControl()` — panel integration
- `clear()` — wipe rendered entities without deactivating

Prefix your `id` with `contrib-` — bare namespaces are reserved for
in-house modules.

## Rules

- **No exfiltration.** A module that phones home, harvests data, or
  weakens the privacy model will not ship — full stop.
- **Clean teardown.** Everything `register` creates, `unregister`
  removes — entities, listeners, timers, subscriptions.
- **Fail contained.** Throw inside your own methods only; never let a
  module error propagate into the host UI.
- **Declare your data.** Modules listing remote data sources must say
  so plainly — the privacy model is part of the product.

## Submitting

1. Write the module against the `.d.ts` contract.
2. Open an issue/discussion on the public repo with a description +
   the module file (or a link to your repo).
3. In-house review: correctness, teardown, privacy, perf cost.
4. Accepted modules ship inside a Workstation build and appear in the
   module panel.

Flagship-tier modules (engine-level compute, advanced analysis) are
developed in-house — community modules extend the cockpit surface.
