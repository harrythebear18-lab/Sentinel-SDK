/**
 * Sentinel SDK — EarthEnginePlugin contract (v0.1.x)
 *
 * This is the public module interface. Implement it in a single file and
 * submit for review; accepted modules ship inside Workstation builds.
 *
 * Type surface only — no implementation is exposed.
 */

/** What a module receives when it attaches to the globe. */
export interface PluginContext {
  /** The 3D globe viewer (Cesium.Viewer-compatible). */
  viewer: unknown
  /** Shared scene state — camera, selection, active layers. */
  sceneContext: unknown
  /** Workstation capability surface (typed namespaces — see API.md). */
  ipc: unknown
  /** Shared label/card overlay layer with collision management. */
  worldOverlay?: unknown
}

/** Health/status shown in the module panel. */
export interface PluginStats {
  count: number
  status: 'nominal' | 'loading' | 'degraded' | 'stale' | 'error' | 'disabled'
  error?: string
}

/* ── Declarative inspector controls ─────────────────────────────── */

export interface PluginButtonSpec {
  type: 'button'
  id: string
  label: string
  variant?: 'primary' | 'danger' | 'default'
  disabled?: boolean
}

export interface PluginToggleSpec {
  type: 'toggle'
  id: string
  label: string
  value: boolean
  disabled?: boolean
}

export interface PluginSliderSpec {
  type: 'slider'
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  disabled?: boolean
}

export interface PluginSelectSpec {
  type: 'select'
  id: string
  label: string
  value: string
  options: { label: string; value: string }[]
  disabled?: boolean
}

export interface PluginInputSpec {
  type: 'input'
  id: string
  label: string
  value: string
  placeholder?: string
}

export interface PluginDisplaySpec {
  type: 'display'
  id: string
  label: string
  value: string
  color?: string
}

export interface PluginSeparatorSpec {
  type: 'separator'
  id: string
  label?: string
}

export type PluginControlSpec =
  | PluginButtonSpec
  | PluginToggleSpec
  | PluginSliderSpec
  | PluginSelectSpec
  | PluginInputSpec
  | PluginDisplaySpec
  | PluginSeparatorSpec

/** The module contract. */
export interface EarthEnginePlugin {
  /** Unique module ID — prefix it, e.g. 'contrib-my-module'. */
  id: string
  /** Human-readable name shown in the module panel. */
  name: string
  /** Category for UI grouping. */
  category:
    | 'terrain' | 'imagery' | 'mapping' | 'mission' | 'live' | 'climate'
    | 'infrastructure' | 'ai' | 'media' | 'system' | 'vr' | 'history'
    | 'detail'
  /** Attach to the globe — called once when the module is enabled. */
  register(ctx: PluginContext): void
  /** Detach cleanly — called when disabled or when the app closes. */
  unregister(): void
  /** React to scene context changes (camera move, layer change). */
  update?(ctx: PluginContext): void
  /** Health/status for the module panel. */
  getStats?(): PluginStats
  /** Declarative controls for the inspector panel. */
  getControls?(): PluginControlSpec[]
  /** Handle a control interaction (button click, slider change…). */
  onControl?(id: string, value?: unknown): void
  /** Clear rendered entities without deactivating. */
  clear?(): void
}
