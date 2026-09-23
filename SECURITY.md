# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest release | Yes |
| Older releases | No — update to the latest release |

Security fixes ship in new releases. Always run the latest version.

## Reporting a Vulnerability

**Do NOT open a public issue for security vulnerabilities.**

To report a vulnerability:

1. Join our [Discord server](https://discord.gg/denat8G6ze)
2. Send a direct message to a maintainer with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

You will receive a response within 48 hours. If confirmed, we will:

- Acknowledge receipt within 48 hours
- Provide an estimated fix timeline within 7 days
- Release a patch and credit you (unless you prefer anonymity)

## Security posture (what we can say publicly)

- Renderer and main process are isolated; no Node integration in the UI
- Privileged operations go through a restricted IPC bridge
- The local API binds loopback only by default; LAN access is opt-in
  and always requires authentication
- Device pairing grants persistent remote access and requires explicit
  in-app approval — it is never the default join path; session PINs
  are the standard procedure and grant session access only
- AI processing is local by default — no data leaves the machine
- License files are encrypted using OS secure storage
- A staged security model (LOCK / AI / FULL / NET) controls what
  network and location data is exposed in the UI
- Cached data stays on your machine; caches are bounded

## Best practices for users

1. Keep the app updated — always run the latest release
2. Use the LOCK security stage when not actively analyzing
3. Do not share your license key — it may be machine-bound
4. Only pair devices you fully trust and control
5. Do not expose the local API or Ollama ports to untrusted networks
6. Use a VPN for sensitive work

## Contact

[Discord server](https://discord.gg/denat8G6ze) — DM a maintainer.

---

© 2026 Visentrix. All rights reserved.
