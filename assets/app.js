const state = {
  package: null,
  fileName: null,
};

const demoPackage = {
  version: "CSAC-LITE-v1",
  algorithm_id: "demo_decision_v1",
  result: {
    decision: "APPROVED",
    score: 87,
  },
  proof: {
    integrity_ref: "demo-integrity-reference",
    signature: "demo-signature-value",
    public_key: "demo-public-key",
  },
  metadata: {
    created_at: "2026-06-18T00:00:00Z",
    operator: "Genesis Verified",
    trust_profile: "lite-demo",
  },
};

const elements = {
  apiEndpoint: document.getElementById("apiEndpoint"),
  fileInput: document.getElementById("fileInput"),
  dropzone: document.getElementById("dropzone"),
  verifyButton: document.getElementById("verifyButton"),
  loadDemoButton: document.getElementById("loadDemoButton"),
  resultStatus: document.getElementById("resultStatus"),
  resultMessage: document.getElementById("resultMessage"),
  jsonPreview: document.getElementById("jsonPreview"),
  resultDot: document.querySelector(".dot"),
};

const savedEndpoint = localStorage.getItem("csac_api_endpoint");
if (savedEndpoint) {
  elements.apiEndpoint.value = savedEndpoint;
}

elements.apiEndpoint.addEventListener("change", () => {
  localStorage.setItem("csac_api_endpoint", elements.apiEndpoint.value.trim());
});

elements.fileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  await loadFile(file);
});

elements.dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  elements.dropzone.classList.add("active");
});

elements.dropzone.addEventListener("dragleave", () => {
  elements.dropzone.classList.remove("active");
});

elements.dropzone.addEventListener("drop", async (event) => {
  event.preventDefault();
  elements.dropzone.classList.remove("active");
  const file = event.dataTransfer.files?.[0];
  if (!file) return;
  await loadFile(file);
});

elements.verifyButton.addEventListener("click", async () => {
  if (!state.package) {
    setStatus("warning", "No package loaded", "Upload or load a demo proof package first.");
    return;
  }

  const endpoint = elements.apiEndpoint.value.trim();
  if (endpoint) {
    await verifyWithRemoteBackend(endpoint, state.package);
    return;
  }

  verifyInPublicDemoMode(state.package);
});

elements.loadDemoButton.addEventListener("click", () => {
  state.package = demoPackage;
  state.fileName = "safe_demo_package.json";
  renderJson(demoPackage);
  setStatus("neutral", "Demo package loaded", "No backend endpoint configured. You can verify it in local public demo mode or configure a Scaleway API endpoint.");
});

async function loadFile(file) {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    state.package = parsed;
    state.fileName = file.name;
    renderJson(parsed);
    setStatus("neutral", "Package loaded", `${file.name} is ready for verification.`);
  } catch (error) {
    state.package = null;
    renderJson({ error: "Invalid JSON" });
    setStatus("invalid", "Invalid JSON", "The selected file could not be parsed as a valid JSON proof package.");
  }
}

async function verifyWithRemoteBackend(endpoint, proofPackage) {
  setStatus("warning", "Calling backend", "Sending the package to the configured verification API.");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ package: proofPackage }),
    });

    const data = await response.json();
    renderJson(data);

    if (!response.ok) {
      setStatus("invalid", "Backend rejected request", data.message || "The verification backend returned an error.");
      return;
    }

    if (data.valid === true || data.status === "VERIFIED") {
      setStatus("valid", "Verified", data.summary || "The backend returned a verified status.");
      return;
    }

    setStatus("invalid", data.status || "Not verified", data.summary || "The backend did not verify this package.");
  } catch (error) {
    setStatus("invalid", "Backend unavailable", "Could not reach the configured API endpoint. Check CORS, URL, and backend availability.");
  }
}

function verifyInPublicDemoMode(proofPackage) {
  const requiredTopLevelFields = ["version", "algorithm_id", "result", "proof", "metadata"];
  const missing = requiredTopLevelFields.filter((field) => !(field in proofPackage));

  const hasDemoSignature = Boolean(proofPackage.proof?.signature);
  const hasDemoIntegrityRef = Boolean(proofPackage.proof?.integrity_ref);
  const isSupportedProfile = proofPackage.version === "CSAC-LITE-v1";

  const result = {
    valid: missing.length === 0 && hasDemoSignature && hasDemoIntegrityRef && isSupportedProfile,
    mode: "public-demo",
    warning: "This frontend demo performs only non-sensitive public checks. Advanced verification profiles must run on the protected backend.",
    checks: {
      format: missing.length === 0 ? "valid" : "invalid",
      profile: isSupportedProfile ? "supported" : "unsupported",
      signature_presence: hasDemoSignature ? "present" : "missing",
      integrity_reference: hasDemoIntegrityRef ? "present" : "missing",
    },
    missing_fields: missing,
  };

  renderJson(result);

  if (result.valid) {
    setStatus("valid", "Demo verified", "The package passed public demo checks. Configure the Scaleway backend for protected verification profiles.");
    return;
  }

  setStatus("invalid", "Demo verification failed", "The package did not pass the public demo checks.");
}

function setStatus(kind, title, message) {
  elements.resultDot.className = `dot ${kind}`;
  elements.resultStatus.textContent = title;
  elements.resultMessage.textContent = message;
}

function renderJson(value) {
  elements.jsonPreview.textContent = JSON.stringify(value, null, 2);
}
