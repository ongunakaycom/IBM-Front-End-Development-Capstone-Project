import React, { useState } from 'react';
import './ReviewForm.css';

function GiveReviews() {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false); // New state
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      setSubmittedMessage(formData);
      setFormData({
        name: '',
        review: '',
        rating: 0,
      });
      setIsFeedbackSubmitted(true); // Disable the button after submission
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-container">
      <h2>Form with Message</h2>
      {!showForm ? (
        <button onClick={handleButtonClick} disabled={isFeedbackSubmitted}>
          {isFeedbackSubmitted ? 'Feedback Submitted' : 'Open Form'}
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {submittedMessage.rating}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;