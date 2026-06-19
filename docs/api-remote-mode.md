# Developer Reference

CSAC-Lite Verifier can connect to a compatible verification service.

## Request

Submit a verification package.

## Response

Return a clear status for the submitted package.

Common statuses:

- VERIFIED
- INVALID
- UNSUPPORTED PROFILE

## Recommended response fields

- status
- summary
- profile
- timestamp
- checks

## Principle

The public experience should stay simple: submit, review, confirm, report.
