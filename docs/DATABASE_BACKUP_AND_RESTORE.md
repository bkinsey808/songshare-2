# Database Backup and Restore

Since SongShare-2 uses the free tier of Firestore, we have implemented custom functionality for database backups and restores. This ensures data safety and recovery without relying on paid Firestore features.

## Backup and Restore Features

- **Automated Backups**: Regularly scheduled backups of Firestore data to a secure storage location.
- **Manual Backups**: Option to trigger backups on demand.
- **Restore Functionality**: Ability to restore data from backups in case of accidental deletion or corruption.

## Steps to Configure Backups

1. **Set up a secure storage location**:

   - Use a free-tier cloud storage service (e.g., AWS S3, Google Cloud Storage, or Firebase Storage).

2. **Implement Backup Logic**:

   - Use Firestore's SDK to export data to the storage location.
   - Schedule backups using a cron job or a serverless function.

3. **Implement Restore Logic**:

   - Use Firestore's SDK to import data from the storage location.
   - Provide an admin interface for triggering restores.

4. **Test Backup and Restore**:
   - Verify that backups are created and stored correctly.
   - Test restoring data to ensure accuracy and completeness.

## Additional Notes on Backup Constraints

The backup functionality includes specific constraints to ensure data integrity and prevent accidental overwrites:

- **Cannot Overwrite Production**: Backups cannot overwrite the "production" prefix to avoid unintended data loss in the production environment. If this is attempted, an error message will be returned.
- **No Collections with From Prefix Found**: If no collections are found with the specified "from" prefix, the backup process will halt, and an error will be displayed. This ensures that the backup operation is meaningful and targets existing data.

These constraints are enforced in the `backUp.ts` file, and error messages are surfaced to the user through the form submission logic in `backUpFormSubmit.ts`. This provides clear feedback to users when issues arise during the backup process.

For more details, refer to the Firestore SDK documentation.
