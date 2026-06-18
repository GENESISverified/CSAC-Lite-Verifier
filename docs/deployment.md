# Deployment Guide

This guide explains how to deploy the public CSAC-Lite Verifier architecture.

The recommended model is:

```text
GitHub Pages frontend
        |
        v
Scaleway FastAPI backend
```

The frontend is public. The backend is controlled.

---

## 1. Deploy frontend with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Pages**.
4. Select **Deploy from a branch**.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.

Expected URL pattern:

```text
https://genesisverified.github.io/CSAC-Lite-Verifier/
```

GitHub may normalize capitalization in the final URL.

---

## 2. Run backend locally first

```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

Health check:

```bash
curl http://127.0.0.1:8080/health
```

Verification test:

```bash
curl -X POST http://127.0.0.1:8080/verify \
  -H "Content-Type: application/json" \
  -d @test_request.json
```

---

## 3. Docker build

```bash
cd server
docker build -t csac-lite-verifier-api .
```

Run:

```bash
docker run --rm -p 8080:8080 \
  -e ALLOWED_ORIGINS="*" \
  csac-lite-verifier-api
```

---

## 4. Scaleway deployment

Recommended first deployment options:

- Scaleway Serverless Containers;
- Scaleway Instance with Docker;
- managed reverse proxy in front of the container.

Required environment variables:

```text
ALLOWED_ORIGINS=https://genesisverified.github.io
MAX_PACKAGE_BYTES=200000
```

Temporary test setting:

```text
ALLOWED_ORIGINS=*
```

Production should not keep wildcard CORS.

---

## 5. Connect frontend to backend

Open the public frontend and enter:

```text
https://your-scaleway-domain/verify
```

Then upload or load a safe demo package and click **Verify package**.

Expected response:

```text
VERIFIED
```

for the valid demo package.

---

## 6. Security checklist

Before public exposure:

- restrict CORS to the frontend URL;
- enable HTTPS;
- reject oversized payloads;
- avoid storing submitted packages by default;
- avoid exposing internal error traces;
- keep protected verification profiles private;
- rotate any deployment secrets;
- monitor request volume.

---

## 7. Enterprise separation

Keep the following outside the public deployment:

- enterprise proof-generation engine;
- protected CSAC verification profiles;
- attestation workflows;
- ZK circuits;
- private registries;
- customer-specific packages;
- operator secrets.
