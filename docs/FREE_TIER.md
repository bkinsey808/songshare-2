# Free Tier Analysis

This document evaluates the scalability of the SongShare-2 project in terms of free-tier limits for various services.

## Firestore

- **Free Tier Limits**:
  - 50,000 document reads, 50,000 writes, and 1 GB of storage per month.
- **Potential Issues**:
  - Automated backups and real-time listeners could quickly consume these limits.
  - Large datasets in collections like `users`, `playlists`, and `songs` may exceed storage limits.
- **Recommendations**:
  - Minimize real-time listeners and batch reads/writes.
  - Regularly clean up unused data.

## Cloudflare

- **Free Tier Limits**:
  - 100,000 requests per day for Workers and 1 GB of storage for Pages.
- **Potential Issues**:
  - High traffic or complex server-side logic in Workers could exceed these limits.
- **Recommendations**:
  - Use caching and rate limiting to reduce Worker requests.
  - Optimize API endpoints to handle traffic efficiently.

## Firebase Authentication

- **Free Tier Limits**:
  - Up to 50,000 monthly active users.
  - 10,000 phone number verifications per month.
- **Potential Issues**:
  - Authentication requests could exceed these limits as the user base grows significantly.
- **Recommendations**:
  - Monitor active user counts.
  - Consider upgrading to a paid plan (Blaze) if user growth exceeds free-tier limits.

## Google Analytics

- **Free Tier Limits**:
  - No strict limits, but high traffic could lead to sampling in reports.
- **Potential Issues**:
  - Reduced data accuracy due to sampling.
- **Recommendations**:
  - Use custom dimensions and metrics to reduce the volume of tracked data.

## Backup and Restore

- **Free Tier Limits**:
  - Depends on the chosen cloud storage service (e.g., AWS S3, Google Cloud Storage).
- **Potential Issues**:
  - Frequent backups or large backup sizes could exceed storage limits.
- **Recommendations**:
  - Schedule backups during off-peak hours.
  - Compress backup data to save storage space.

## Expo

- **Free Tier Limits**:
  - Supports basic app builds and hosting.
- **Potential Issues**:
  - Advanced features or high build frequency might require a paid plan.
- **Recommendations**:
  - Monitor build frequency and consider upgrading if needed.

## Summary

To ensure the project remains within free-tier limits:

- Optimize Firestore usage by minimizing real-time listeners and cleaning up unused data.
- Use caching and rate limiting for Cloudflare Workers.
- Monitor Firebase user counts and storage usage.
- Compress and schedule backups to save storage space.
- Use custom dimensions in Google Analytics to reduce data volume.

Scaling beyond free-tier limits may require upgrading to paid plans for some services.
