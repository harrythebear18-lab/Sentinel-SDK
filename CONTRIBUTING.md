# Contributing to the Sentinel SDK

This repo is the module development kit for OSINT Sentinel Workstation —
the supported way to extend the product without access to the engine
source.

## Writing a module

1. Read the contract: [`sdk/earth-engine-plugin.d.ts`](../sdk/earth-engine-plugin.d.ts)
2. Start from the example: [`examples/hello-overlay`](../examples/hello-overlay/)
3. Follow the lifecycle rules in [`docs/SUBMISSION.md`](../docs/SUBMISSION.md)

## Submitting

Modules are **reviewed before inclusion** in a build. Open a pull
request with your module file (single `.js`/`.ts` file, `contrib-` ID
prefix) or open an issue/discussion linking your repo.

Review looks at: correctness, clean teardown, privacy (no silent
exfiltration), and performance cost. Flagship-tier modules are developed
in-house; community modules extend the cockpit surface.

## Other ways to contribute

- **Bugs in the SDK/docs** — [Bug Report](../../issues/new?template=bug_report.yml)
- **API/contract requests** — [Feature Request](../../issues/new?template=feature_request.yml) —
  if a module needs a capability the contract doesn't expose, ask
- **Questions** — [Question template](../../issues/new?template=question.yml),
  [Discussions](../../discussions), or [Discord](https://discord.gg/denat8G6ze)

## Ground rules

All participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md).
Security issues go through [SECURITY.md](SECURITY.md), never public issues.

---

© 2026 Visentrix. All rights reserved.
