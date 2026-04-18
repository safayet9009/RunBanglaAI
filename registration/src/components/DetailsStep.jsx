import React from 'react';

function DetailsStep({ event, formData, onFormChange, onNext, onBack, error, setError }) {
  return (
    <div className="form-container">
      <div className="step-indicator">
        <div className="step active"></div>
        <div className="step"></div>
        <div className="step"></div>
      </div>

      <div className="form-header">
        <h2>Step 1: Event Details</h2>
        <p>Register your information</p>
      </div>

      <div className="event-info">
        <h4>📅 {event.name}</h4>
        <p>📍 {event.location}</p>
        <p>🏅 {event.distance}</p>
        <p>💰 ৳{event.amount}</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onFormChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onFormChange}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>

          <div className="form-group">
            <label>Emergency Contact *</label>
            <input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={onFormChange}
              placeholder="Emergency contact"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>T-Shirt Size</label>
            <select name="tshirtSize" value={formData.tshirtSize} onChange={onFormChange}>
              <option value="XS">Extra Small (XS)</option>
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
              <option value="XXL">2XL (XXL)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={onFormChange}>
              <option value="child">Child (Below 12)</option>
              <option value="teen">Teen (13-17)</option>
              <option value="adult">Adult (18-45)</option>
              <option value="senior">Senior (45+)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Medical Condition (If any)</label>
          <textarea
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={onFormChange}
            placeholder="Any allergies or medical conditions?"
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            ← Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailsStep;
