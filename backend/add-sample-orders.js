const { getDb } = require('./src/database/db');

// Sample orders data
const sampleOrders = [
  {
    reference: 'SC-A1B2C3',
    customer_name: 'Priya Sharma',
    customer_email: 'priya.sharma@example.com',
    customer_phone: '+91 9876543210',
    total: 450.00,
    status: 'pending',
    notes: 'Please pack extra carefully for gift'
  },
  {
    reference: 'SC-D4E5F6',
    customer_name: 'Rajesh Kumar',
    customer_email: 'rajesh.kumar@example.com',
    customer_phone: '+91 9123456789',
    total: 280.00,
    status: 'confirmed',
    notes: 'Delivery required before 6 PM'
  },
  {
    reference: 'SC-G7H8I9',
    customer_name: 'Aisha Patel',
    customer_email: 'aisha.patel@example.com',
    customer_phone: '+91 9988776655',
    total: 320.00,
    status: 'ready',
    notes: null
  },
  {
    reference: 'SC-J1K2L3',
    customer_name: 'Vikram Singh',
    customer_email: 'vikram.singh@example.com',
    customer_phone: '+91 9111222333',
    total: 180.00,
    status: 'completed',
    notes: 'Regular customer - 10% discount applied'
  },
  {
    reference: 'SC-M4N5O6',
    customer_name: 'Deepika Rao',
    customer_email: 'deepika.rao@example.com',
    customer_phone: '+91 9444555666',
    total: 520.00,
    status: 'pending',
    notes: 'Birthday celebration order'
  }
];

async function addSampleOrders() {
  const db = getDb();
  
  console.log('Adding sample orders...');
  
  for (const order of sampleOrders) {
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO orders (reference, customer_name, customer_email, customer_phone, total, status, notes, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
        [order.reference, order.customer_name, order.customer_email, order.customer_phone, order.total, order.status, order.notes],
        function(err) {
          if (err) {
            console.error('Error inserting order:', err);
            reject(err);
          } else {
            console.log(`✅ Added order: ${order.reference} - ${order.customer_name}`);
            resolve();
          }
        }
      );
    });
  }
  
  console.log('✅ All sample orders added successfully!');
  process.exit(0);
}

// Check if orders already exist
const db = getDb();
db.get('SELECT COUNT(*) as count FROM orders', (err, result) => {
  if (err) {
    console.error('Error checking orders:', err);
    process.exit(1);
  }
  
  if (result.count > 0) {
    console.log(`📊 Database already has ${result.count} orders.`);
    process.exit(0);
  } else {
    addSampleOrders();
  }
});
