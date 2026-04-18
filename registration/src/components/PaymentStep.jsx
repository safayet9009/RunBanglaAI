import React, { useState } from 'react';

const PROMO_CODES = {
  'RUN10': 10,
  'RUN20': 20,
  'BANGLA5': 5,
  'FITLIFE15': 15
};

function PaymentStep({ event, formData, onFormChange, onSubmit, onBack, loading, error, setError }) {
  const [discount, setDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const finalAmount = event.amount - (event.amount * discount) / 100;

  const handleApplyPromo = () => {
    const code = formData.discountCode?.toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setShowPromoInput(false);
      setError(null);
    } else {
      setError('❌ Invalid promo code');
    }
  };

  return (
    <div className="form-container">
      <div className="step-indicator">
        <div className="step active"></div>
        <div className="step active"></div>
        <div className="step"></div>
      </div>

      <div className="form-header">
        <h2>Step 2: Payment</h2>
        <p>Choose payment method</p>
      </div>

      <div className="event-info">
        <h4>📅 {event.name}</h4>
        <p>Registrant: <strong>{formData.name}</strong></p>
        <p>Email: <strong>{formData.email}</strong></p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-group">
          <label>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={onFormChange}>
            <option value="card">Credit/Debit Card</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label>Promo Code (Optional)</label>
              <input
                type="text"
                name="discountCode"
                value={formData.discountCode}
                onChange={onFormChange}
                placeholder="e.g., RUN10, RUN20"
                disabled={showPromoInput === false && discount === 0}
              />
            </div>
            {discount === 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleApplyPromo}
                style={{ marginTop: '1.5rem', flex: '0 0 120px', padding: '0.8rem' }}
              >
                Apply
              </button>
            )}
          </div>
          {discount > 0 && (
            <div className="alert alert-success" style={{ marginTop: '0.5rem' }}>
              ✅ Discount applied: {discount}% off
            </div>
          )}
          <p style={{ fontSize: '0.8rem', color: '#a8b5c8', marginTop: '0.5rem' }}>
            Available: RUN10 (10%), RUN20 (20%), BANGLA5 (5%), FITLIFE15 (15%)
          </p>
        </div>

        <div className="ticket-info">
          <div className="ticket-field">
            <label>Base Amount:</label>
            <span className="value">৳{event.amount}</span>
          </div>
          {discount > 0 && (
            <>
              <div className="ticket-field">
                <label>Discount ({discount}%):</label>
                <span className="value">-৳{(event.amount * discount / 100).toFixed(0)}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(0, 255, 136, 0.2)', paddingTop: '1rem' }}>
                <div className="ticket-field">
                  <label>Final Amount:</label>
                  <span className="value" style={{ fontSize: '1.3rem' }}>৳{finalAmount.toFixed(0)}</span>
                </div>
              </div>
            </>
          )}
          {discount === 0 && (
            <div className="ticket-field">
              <label>Total Amount:</label>
              <span className="value" style={{ fontSize: '1.3rem' }}>৳{event.amount}</span>
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="button" className="btn btn-secondary" onClick={onBack} disabled={loading}>
            ← Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Processing...' : '✅ Complete Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentStep;
