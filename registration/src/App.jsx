import React, { useState } from 'react';
import apiService from './apiService';
import DetailsStep from './components/DetailsStep';
import PaymentStep from './components/PaymentStep';
import SuccessStep from './components/SuccessStep';
import './App.css';

const EVENTS = [
  {
    id: 1,
    name: 'Dhaka Marathon 2026',
    date: 'May 15, 2026',
    location: 'Dhaka, Bangladesh',
    distance: '42.2 km (Full Marathon)',
    amount: 2500,
    image: '🏃‍♂️'
  },
  {
    id: 2,
    name: 'Half Marathon Chittagong',
    date: 'June 5, 2026',
    location: 'Chittagong, Bangladesh',
    distance: '21.1 km (Half Marathon)',
    amount: 1500,
    image: '🏅'
  },
  {
    id: 3,
    name: 'Fun Run Sylhet',
    date: 'July 10, 2026',
    location: 'Sylhet, Bangladesh',
    distance: '5 km (Fun Run)',
    amount: 500,
    image: '🎉'
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    tshirtSize: 'M',
    category: 'adult',
    medicalCondition: '',
    paymentMethod: 'card',
    discountCode: '',
  });
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentStep(1);
    setError(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate details
      if (!formData.name || !formData.email || !formData.phone || !formData.emergencyContact) {
        setError('❌ Please fill all required fields');
        return;
      }
      setError(null);
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setError(null);
  };

  const handleSubmitPayment = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        emergencyContact: formData.emergencyContact,
        tshirtSize: formData.tshirtSize,
        category: formData.category,
        medicalCondition: formData.medicalCondition || '',
        paymentMethod: formData.paymentMethod,
        amount: selectedEvent.amount,
        discountCode: formData.discountCode || null
      };

      console.log('📤 Submitting registration:', payload);
      console.log('📤 Event:', selectedEvent);

      const response = await apiService.registerMarathon(payload);

      console.log('✅ Full Response:', response);
      console.log('✅ Response success:', response.success);
      console.log('✅ Response data:', response.data);

      if (response.success && response.data) {
        console.log('🎉 Setting registration data and moving to step 3');
        setRegistrationData(response.data);
        setCurrentStep(3);
        console.log('🎉 Step changed to 3');
      } else {
        const errorMsg = response.message || response.error || 'Registration failed';
        console.error('❌ Response error:', errorMsg);
        setError('❌ ' + errorMsg);
      }
    } catch (err) {
      console.error('❌ Catch Error:', err);
      console.error('❌ Error message:', err.message);
      setError('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {currentStep === 0 && (
        <div className="events-container">
          <div className="header">
            <h1>🏃 Marathon Registration</h1>
            <p>Select an event to register</p>
          </div>

          <div className="events-grid">
            {EVENTS.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-icon">{event.image}</div>
                <h3>{event.name}</h3>
                <p className="event-date">📅 {event.date}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-distance">🏅 {event.distance}</p>
                <p className="event-amount">💰 ৳{event.amount}</p>
                <button 
                  className="btn-register"
                  onClick={() => handleEventSelect(event)}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentStep === 1 && selectedEvent && (
        <DetailsStep 
          event={selectedEvent}
          formData={formData}
          onFormChange={handleFormChange}
          onNext={handleNextStep}
          onBack={handlePreviousStep}
          error={error}
          setError={setError}
        />
      )}

      {currentStep === 2 && selectedEvent && (
        <PaymentStep 
          event={selectedEvent}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmitPayment}
          onBack={handlePreviousStep}
          loading={loading}
          error={error}
          setError={setError}
        />
      )}

      {currentStep === 3 && registrationData ? (
        <SuccessStep 
          event={selectedEvent}
          registration={registrationData}
          formData={formData}
          onBackToEvents={() => {
            setCurrentStep(0);
            setSelectedEvent(null);
            setFormData({
              name: '',
              email: '',
              phone: '',
              emergencyContact: '',
              tshirtSize: 'M',
              category: 'adult',
              medicalCondition: '',
              paymentMethod: 'card',
              discountCode: '',
            });
            setRegistrationData(null);
          }}
        />
      ) : currentStep === 3 ? (
        <div className="app-container" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>⏳ Loading...</h2>
          <p>Please wait while we process your registration...</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
