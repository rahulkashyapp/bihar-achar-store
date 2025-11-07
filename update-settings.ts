import { db } from './src/lib/db';

async function updateSettings() {
  console.log('Updating settings...');

  // Update UPI ID
  await db.settings.updateMany({
    where: { key: 'upi_id' },
    data: { value: 'rahulkashyap9798@ybl' }
  });

  // Update phone number
  await db.settings.updateMany({
    where: { key: 'contact_phone' },
    data: { value: '+91 97986 36339' }
  });

  console.log('Settings updated successfully.');
}

updateSettings()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });