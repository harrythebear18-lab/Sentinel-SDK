<!--
Module submissions and SDK/doc fixes are welcome here.

Modules: single file, `contrib-` ID prefix, implements the
EarthEnginePlugin contract (see sdk/earth-engine-plugin.d.ts and
docs/SUBMISSION.md). Acceptance is by review — correctness, clean
teardown, privacy, perf.

For product bugs/features, use the issue tracker instead.
-->

## What does this change?

<!-- Module submission? Doc fix? Describe it. -->

## Module checklist (if submitting a module)

- [ ] Implements `EarthEnginePlugin` (`register`/`unregister` at minimum)
- [ ] `id` is prefixed `contrib-`
- [ ] `unregister()` removes everything the module created
- [ ] No unexpected network calls — declared data sources only
