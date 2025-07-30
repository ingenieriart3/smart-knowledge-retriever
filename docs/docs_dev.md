# 🛠️ Dev Notes & Improvements

This document complements the main `README.md` by outlining key development details and improvements for maintaining and extending the project.

---

## 🧠 Local Dev Adjustments

### Custom `dev` Scripts
To support isolated development and rebuild only what you need, you can run:

```bash
./dev.sh backend     # Launch backend only
./dev.sh app         # Launch React dashboard
./dev.sh landing     # Launch Svelte landing
./dev.sh all         # Launch full stack
./dev.sh clean       # Stop and remove all containers
```

---

### 🧪 SvelteKit Landing Notes

To run the landing with external accessibility and fix Vite port binding, the dev script was updated:

```json
"dev": "vite dev --port 3001 --host"
```

This ensures the container exposes its port properly and binds to 0.0.0.0.

> 🎯 Access at: http://localhost:3001

---

### 🩺 Add Healthchecks (Recommended)

Add Docker `HEALTHCHECK` to improve orchestration and readiness:

```dockerfile
HEALTHCHECK --interval=10s --timeout=5s --start-period=15s   CMD curl --fail http://localhost:3000 || exit 1
```

Use this in the backend Dockerfile to track when the API is up.

---

### 🧼 Container Cleanup

You might encounter orphan containers. Clean up with:

```bash
docker compose down --remove-orphans
```

---

## 📄 Suggestion: Document `dev.sh` inside /docs

Move CLI documentation and tips like these to a dedicated `docs/dev.md` (this file!), improving onboarding and contributor clarity.

---

## 🔮 Future Ideas

- Add Vitest & test coverage badges.
- Add GitHub Actions or CI/CD pipeline example.
- Publish production deployment templates (Railway, Render, VPS).

