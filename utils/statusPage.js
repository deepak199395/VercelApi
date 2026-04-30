const getStatusPage = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>API Status</title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>

    <style>
      body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        display: flex;
        align-items: center;
        gap: 60px;
      }

      .text h1 {
        font-size: 42px;
        margin: 0;
      }

      .text p {
        opacity: 0.8;
        margin-top: 10px;
      }

      .badge {
        margin-top: 20px;
        padding: 8px 16px;
        background: #22c55e;
        border-radius: 20px;
        color: black;
        font-weight: 600;
        display: inline-block;
      }

      .icon {
        font-size: 120px;
        color: #22c55e;
        animation: float 2s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="text">
        <h1>Backend is Live 🚀</h1>
        <p>Your API is running perfectly.</p>
        <div class="badge">STATUS: ONLINE</div>
      </div>

      <div class="icon">
        <i class="fas fa-server"></i>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = getStatusPage;