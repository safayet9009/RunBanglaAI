import React from 'react';
import QRCode from 'qrcode.react';

function SuccessStep({ event, registration, formData, onBackToEvents }) {
  // Defensive checks for missing data
  if (!registration || !event) {
    return (
      <div className="success-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>⏳ Loading...</h2>
        <p>Processing your registration...</p>
      </div>
    );
  }
  
  const ticketQRValue = `${registration.ticketId}-${event.name}-${registration.email || formData?.email || 'user'}@runbangla.ai`;

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">🎉</div>
        
        <h2>You're Registered!</h2>
        <p>Thank you for registering for {event.name}</p>

        <div className="ticket-info">
          <h3 style={{ color: '#00ff88', marginBottom: '1.5rem' }}>📋 Your Registration Details</h3>

          <div className="ticket-field">
            <label>Ticket ID:</label>
            <span className="value">{registration.ticketId}</span>
          </div>

          <div className="ticket-field">
            <label>Event:</label>
            <span className="value">{registration.eventName}</span>
          </div>

          <div className="ticket-field">
            <label>Name:</label>
            <span className="value">{registration.name}</span>
          </div>

          <div className="ticket-field">
            <label>Email:</label>
            <span className="value">{registration.email}</span>
          </div>

          <div className="ticket-field">
            <label>Phone:</label>
            <span className="value">{registration.phone}</span>
          </div>

          <div className="ticket-field">
            <label>T-Shirt Size:</label>
            <span className="value">{registration.tshirtSize}</span>
          </div>

          <div className="ticket-field">
            <label>Category:</label>
            <span className="value">{registration.category}</span>
          </div>

          <div className="ticket-field">
            <label>Amount Paid:</label>
            <span className="value">৳{registration.finalAmount}</span>
          </div>

          {registration.discountPercentage > 0 && (
            <div className="ticket-field">
              <label>Discount:</label>
              <span className="value">{registration.discountPercentage}% off</span>
            </div>
          )}

          <div className="ticket-field">
            <label>Status:</label>
            <span className="value" style={{ color: '#00ff88' }}>✅ {(registration.status || 'SUCCESS').toUpperCase()}</span>
          </div>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <p style={{ color: '#a8b5c8', marginBottom: '1rem' }}>📱 QR Code for Entry</p>
          <div className="qr-code-container">
            <QRCode 
              value={ticketQRValue} 
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div style={{ 
          background: 'rgba(0, 255, 136, 0.05)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h4 style={{ color: '#00ff88', marginBottom: '0.5rem' }}>✅ What's Next?</h4>
          <ul style={{ color: '#a8b5c8', fontSize: '0.9rem', margin: 0, paddingLeft: '1.5rem' }}>
            <li>Check your email for confirmation</li>
            <li>Keep your Ticket ID safe</li>
            <li>Show QR code at event entry</li>
            <li>Join our community for updates</li>
          </ul>
        </div>

        <div className="success-buttons">
          <button className="btn btn-primary" onClick={onBackToEvents}>
            🏃 Register Another Event
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.location.href = 'http://localhost:8080'}
          >
            🏠 Back to Home
          </button>
        </div>

        <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '1.5rem' }}>
          Registration ID: {registration._id}
        </p>
      </div>
    </div>
  );
}

export default SuccessStep;
