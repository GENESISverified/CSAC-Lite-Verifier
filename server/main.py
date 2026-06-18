import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


APP_NAME = "CSAC-Lite Verifier API"
APP_VERSION = "0.1.0-public-safe"
MAX_PACKAGE_BYTES = int(os.getenv("MAX_PACKAGE_BYTES", "200000"))
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "*").split(",")
    if origin.strip()
]


app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="Public-safe backend surface for CSAC-Lite Verifier. Proprietary verification profiles are intentionally not implemented here.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


class VerifyRequest(BaseModel):
    package: Dict[str, Any] = Field(..., description="Submitted public proof package")


class VerificationDecision(BaseModel):
    valid: bool
    status: str
    profile: str
    summary: str
    checks: Dict[str, str]
    timestamp: str
    mode: str = "public-safe-backend"


@app.get("/health")
def health() -> Dict[str, str]:
    return {
        "status": "ok",
        "service": APP_NAME,
        "version": APP_VERSION,
        "timestamp": utc_now(),
    }


@app.post("/verify", response_model=VerificationDecision)
async def verify(payload: VerifyRequest, request: Request) -> VerificationDecision:
    raw_size = int(request.headers.get("content-length") or 0)
    if raw_size > MAX_PACKAGE_BYTES:
        raise HTTPException(status_code=413, detail="Package too large")

    proof_package = payload.package
    decision = run_public_safe_profile(proof_package)
    return decision


def run_public_safe_profile(proof_package: Dict[str, Any]) -> VerificationDecision:
    """Run only public-safe validation checks.

    This function intentionally does not implement proprietary CSAC transcript logic,
    confidential-computing attestation logic, ZK verification, registry logic, or
    enterprise profiles. Those should live in private modules or managed services.
    """

    required_fields = ["version", "algorithm_id", "result", "proof", "metadata"]
    missing_fields = [field for field in required_fields if field not in proof_package]

    version = str(proof_package.get("version", "unknown"))
    proof = proof_package.get("proof") if isinstance(proof_package.get("proof"), dict) else {}
    metadata = proof_package.get("metadata") if isinstance(proof_package.get("metadata"), dict) else {}

    profile_supported = version == "CSAC-LITE-v1"
    has_integrity_ref = bool(proof.get("integrity_ref"))
    has_signature_ref = bool(proof.get("signature"))
    has_public_key_ref = bool(proof.get("public_key"))
    has_operator = bool(metadata.get("operator"))

    checks = {
        "format": "valid" if not missing_fields else "invalid",
        "profile": "supported" if profile_supported else "unsupported",
        "integrity_reference": "present" if has_integrity_ref else "missing",
        "signature_reference": "present" if has_signature_ref else "missing",
        "public_key_reference": "present" if has_public_key_ref else "missing",
        "metadata": "valid" if has_operator else "limited",
    }

    valid = (
        not missing_fields
        and profile_supported
        and has_integrity_ref
        and has_signature_ref
        and has_public_key_ref
    )

    if valid:
        status = "VERIFIED"
        summary = "The submitted package passed the public-safe CSAC-Lite demonstration profile. Advanced verification requires a protected enterprise profile."
    else:
        status = "INVALID" if profile_supported else "UNSUPPORTED PROFILE"
        summary = "The submitted package did not pass the public-safe CSAC-Lite demonstration profile."

    return VerificationDecision(
        valid=valid,
        status=status,
        profile=version,
        summary=summary,
        checks=checks,
        timestamp=utc_now(),
    )


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()
