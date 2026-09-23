/**
 * hello-overlay — minimal Sentinel module example.
 *
 * Drops a ring on the globe at a fixed point, exposes a radius slider
 * and a visibility toggle in the inspector, reports stats to the panel.
 * Single file, no build step — this is the shape a submitted module takes.
 */

export default class HelloOverlayPlugin {
  id = 'contrib-hello-overlay'
  name = 'Hello Overlay (Example)'
  category = 'detail'

  constructor() {
    this.ctx = null
    this.entity = null
    this.radiusKm = 250
    this.visible = true
    this.count = 0
  }

  register(ctx) {
    this.ctx = ctx
    this.draw()
  }

  unregister() {
    this.clear()
    this.ctx = null
  }

  clear() {
    if (this.entity && this.ctx) {
      this.ctx.viewer.entities.remove(this.entity)
      this.entity = null
      this.count = 0
    }
  }

  draw() {
    this.clear()
    if (!this.visible || !this.ctx) return
    const Cesium = window.Cesium // provided by the host runtime
    // Centered on Greenwich for demo purposes.
    this.entity = this.ctx.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(0, 0),
      ellipse: {
        semiMajorAxis: this.radiusKm * 1000,
        semiMinorAxis: this.radiusKm * 1000,
        material: Cesium.Color.CYAN.withAlpha(0.25),
        outline: true,
        outlineColor: Cesium.Color.CYAN,
      },
      label: {
        text: 'hello overlay',
        font: '12px sans-serif',
        fillColor: Cesium.Color.CYAN,
        pixelOffset: new Cesium.Cartesian2(0, -20),
      },
    })
    this.count = 1
  }

  getStats() {
    return { count: this.count, status: 'nominal' }
  }

  getControls() {
    return [
      { type: 'toggle', id: 'visible', label: 'Visible', value: this.visible },
      { type: 'slider', id: 'radius', label: 'Radius', value: this.radiusKm, min: 50, max: 2000, step: 50, unit: 'km' },
      { type: 'display', id: 'count', label: 'Entities', value: String(this.count) },
    ]
  }

  onControl(id, value) {
    if (id === 'visible') { this.visible = !!value; this.draw() }
    if (id === 'radius') { this.radiusKm = Number(value); this.draw() }
  }
}
