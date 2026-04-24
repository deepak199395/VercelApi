const nodemailer = require("nodemailer");

const sendOrderEmail = async (order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.productName}</td>
      <td>${item.qty}</td>
      <td>₹${item.priceAfterDiscount}</td>
    </tr>
  `).join("");

  const html = `
    <h2>🛒 Order Confirmation</h2>
    <p>Hi ${order.address.fullName},</p>
    <p>Your order has been placed successfully ✅</p>

    <h3>Order Details:</h3>
    <table border="1" cellpadding="10">
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
      ${itemsHtml}
    </table>

    <h3>Total: ₹${order.totalAmount}</h3>

    <h3>Shipping Address:</h3>
    <p>
      ${order.address.addressLine},<br/>
      ${order.address.city}, ${order.address.state} - ${order.address.pincode}
    </p>

    <p>Thank you for shopping ❤️</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: order.email, // IMPORTANT
    subject: "Order Confirmation",
    html,
  });
};

module.exports = sendOrderEmail;