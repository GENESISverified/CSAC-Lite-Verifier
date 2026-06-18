# Launch Checklist

This checklist prepares CSAC-Lite Verifier for a controlled public launch.

---

## Repository status

- [x] README created
- [x] Public landing page created
- [x] Public verifier interface created
- [x] Safe demo examples created
- [x] Public documentation created
- [x] Public white paper created
- [x] Minimal backend scaffold created
- [x] License notice added
- [x] Git ignore rules added
- [x] GitHub Pages marker added
- [x] GitHub Pages deployment workflow added

---

## Before making the repository public

- [ ] Review all public documents for sensitive protocol disclosure
- [ ] Confirm no real secrets or keys are committed
- [ ] Confirm no protected transcript logic is included
- [ ] Confirm no enterprise proof-generation code is included
- [ ] Confirm license strategy
- [ ] Decide public domain name or GitHub Pages URL
- [ ] Configure GitHub Pages
- [ ] Configure backend CORS for the public frontend URL
- [ ] Deploy Scaleway backend
- [ ] Test frontend to backend `/verify` call

---

## GitHub Pages setup

Recommended path with the included GitHub Actions workflow:

1. Open repository settings.
2. Go to **Pages**.
3. Source: **GitHub Actions**.
4. Save if required.
5. Push to `main` or run the workflow manually from **Actions**.

Alternative branch mode:

1. Open repository settings.
2. Go to **Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main`.
5. Folder: `/root`.
6. Save.

Expected public URL pattern:

```text
https://genesisverified.github.io/CSAC-Lite-Verifier/
```

If the account name capitalization changes, GitHub may normalize the URL.

---

## Backend setup

Deploy the backend in `server/` on Scaleway.

Minimum required environment:

```text
ALLOWED_ORIGINS=https://genesisverified.github.io
MAX_PACKAGE_BYTES=200000
```

Temporary development environment:

```text
ALLOWED_ORIGINS=*
MAX_PACKAGE_BYTES=200000
```

---

## Smoke tests

Frontend:

- open the GitHub Pages URL;
- click **Load safe demo package**;
- click **Verify package** with no API endpoint;
- expect public demo success.

Backend:

```bash
curl https://your-scaleway-domain/health
```

Verification endpoint:

```bash
curl -X POST https://your-scaleway-domain/verify \
  -H "Content-Type: application/json" \
  -d @server/test_request.json
```

Expected result:

```json
{
  "valid": true,
  "status": "VERIFIED"
}
```

---

## Public launch rule

The public repository should explain value, use cases, and integration.

It should not explain the protected proof recipe.
