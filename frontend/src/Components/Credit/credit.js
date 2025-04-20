import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/Icons';

function Credit() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [creditScore, setCreditScore] = useState(null);
  const [loanEligible, setLoanEligible] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [reasons, setReasons] = useState([]);

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    let formattedValue = value;
    if (value.length === 2 && !value.includes('/') && expiryDate.length !== 3) {
      formattedValue = value + '/';
    }
    setExpiryDate(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a random credit score between 300 and 850
    const randomScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300;
    setCreditScore(randomScore);
    
    // Determine loan eligibility based on the random score
    const eligible = randomScore >= 650;
    setLoanEligible(eligible);
    
    // Generate reasons for rejection if not eligible
    if (!eligible) {
      const possibleReasons = [
        "High credit utilization ratio (over 50%)",
        "Recent late payment within the last 3 months",
        "Multiple credit inquiries in the past 6 months",
        "Insufficient credit history (less than 2 years)",
        "Debt-to-income ratio exceeds our threshold"
      ];
      
      // Select 2-3 random reasons
      const numberOfReasons = Math.floor(Math.random() * 2) + 2;
      const selectedReasons = [];
      
      while (selectedReasons.length < numberOfReasons) {
        const randomIndex = Math.floor(Math.random() * possibleReasons.length);
        const reason = possibleReasons[randomIndex];
        
        if (!selectedReasons.includes(reason)) {
          selectedReasons.push(reason);
        }
      }
      
      setReasons(selectedReasons);
    } else {
      setReasons([]);
    }
    
    setShowResults(true);
  };

  return (
    <CreditStyled>
      <InnerLayout>
        <h1>Loan Assessment</h1>
        <div className="credit-content">
          <div className="card-form">
            <div className="card-container">
              <div className={`credit-card ${showResults ? 'flip' : ''}`}>
                <div className="front">
                  <div className="card-type">
                    <span>Your Bank</span>
                  </div>
                  <div className="card-number">
                    <span>{cardNumber || '#### #### #### ####'}</span>
                  </div>
                  <div className="card-info">
                    <div className="card-holder">
                      <label>Card Holder</label>
                      <div>{cardName || 'FULL NAME'}</div>
                    </div>
                    <div className="card-expiry">
                      <label>Expires</label>
                      <div>{expiryDate || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>
                <div className="back">
                  <div className="magnetic-strip"></div>
                  <div className="cvv-container">
                    <label>CVV</label>
                    <div className="cvv-box">{cvv ? '•'.repeat(cvv.length) : ''}</div>
                  </div>
                  <div className="signature"></div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Card Number</label>
                <input 
                  type="text"
                  maxLength="19"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="input-group">
                <label>Card Holder Name</label>
                <input 
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input 
                    type="text"
                    maxLength="5"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input 
                    type="text"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn">Check Loan Eligibility</button>
            </form>
          </div>

          {showResults && (
            <div className="loan-results">
              <h2>Loan Assessment Results</h2>
              <div className="credit-score">
                <div className="score-header">Your Credit Score</div>
                <div className={`score-value ${creditScore < 580 ? 'poor' : creditScore < 670 ? 'fair' : creditScore < 740 ? 'good' : 'excellent'}`}>
                  {creditScore}
                </div>
                <div className="score-scale">
                  <div className="scale">
                    <div className="segment poor"></div>
                    <div className="segment fair"></div>
                    <div className="segment good"></div>
                    <div className="segment excellent"></div>
                  </div>
                  <div className="scale-labels">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>
              </div>

              <div className="eligibility-result">
                <h3>{loanEligible ? 'Congratulations!' : 'We\'re Sorry'}</h3>
                <p className={loanEligible ? 'eligible' : 'not-eligible'}>
                  {loanEligible 
                    ? 'Based on your credit score, you are eligible for a loan. One of our representatives will contact you shortly to discuss available options.'
                    : 'Based on your credit score, you are not eligible for a loan at this time.'}
                </p>
                
                {!loanEligible && reasons.length > 0 && (
                  <div className="rejection-reasons">
                    <h4>Reasons:</h4>
                    <ul>
                      {reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                    <p className="improvement-note">
                      We recommend improving these areas and reapplying in 3-6 months.
                    </p>
                  </div>
                )}

                {loanEligible && (
                  <div className="loan-options">
                    <h4>Potential Loan Terms:</h4>
                    <div className="loan-term">
                      <span>Loan Amount:</span>
                      <span>$5,000 - $25,000</span>
                    </div>
                    <div className="loan-term">
                      <span>Interest Rate:</span>
                      <span>{(Math.random() * (12.99 - 7.99) + 7.99).toFixed(2)}%</span>
                    </div>
                    <div className="loan-term">
                      <span>Term Length:</span>
                      <span>12 - 60 months</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </InnerLayout>
    </CreditStyled>
  );
}

const CreditStyled = styled.div`
  h1 {
    color: rgba(34, 34, 96, 1);
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  
  .credit-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .card-form {
    flex: 1;
    min-width: 300px;
  }
  
  .card-container {
    perspective: 1000px;
    margin-bottom: 2rem;
    height: 200px;
  }
  
  .credit-card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }
  
  .credit-card.flip {
    transform: rotateY(180deg);
  }
  
  .front, .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #7367f0, #5146cb);
    color: white;
  }
  
  .back {
    transform: rotateY(180deg);
    background: linear-gradient(135deg, #6259cb, #3c3194);
  }
  
  .card-type {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  
  .card-number {
    font-size: 1.3rem;
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
  }
  
  .card-info {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
  
  .card-holder, .card-expiry {
    display: flex;
    flex-direction: column;
  }
  
  .card-holder label, .card-expiry label {
    font-size: 0.7rem;
    opacity: 0.8;
    margin-bottom: 0.3rem;
  }
  
  .magnetic-strip {
    height: 40px;
    background: #333;
    margin: 1rem 0;
  }
  
  .cvv-container {
    padding: 0.5rem;
    background: white;
    color: #333;
    border-radius: 4px;
    margin: 1rem 0;
  }
  
  .cvv-box {
    background: #f5f5f5;
    padding: 0.5rem;
    text-align: right;
    border-radius: 4px;
    margin-top: 0.2rem;
  }
  
  .signature {
    height: 40px;
    background: #f5f5f5;
    border-radius: 4px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
  }
  
  .input-row {
    display: flex;
    gap: 1rem;
  }
  
  .input-row .input-group {
    flex: 1;
  }
  
  label {
    font-size: 0.9rem;
    color: rgba(34, 34, 96, 0.8);
    margin-bottom: 0.3rem;
  }
  
  input {
    padding: 0.8rem;
    border-radius: 8px;
    border: 2px solid rgba(34, 34, 96, 0.2);
    outline: none;
    font-size: 1rem;
    transition: border 0.3s ease;
  }
  
  input:focus {
    border-color: rgba(34, 34, 96, 0.6);
  }
  
  .submit-btn {
    background: rgba(34, 34, 96, 1);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    transition: background 0.3s ease;
  }
  
  .submit-btn:hover {
    background: rgba(34, 34, 96, 0.8);
  }
  
  .loan-results {
    flex: 1;
    min-width: 300px;
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .loan-results h2 {
    color: rgba(34, 34, 96, 1);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  
  .credit-score {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 12px;
  }
  
  .score-header {
    font-size: 1.1rem;
    color: rgba(34, 34, 96, 0.8);
    margin-bottom: 0.5rem;
  }
  
  .score-value {
    font-size: 3rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }
  
  .score-value.poor {
    color: #ff4d4d;
  }
  
  .score-value.fair {
    color: #ffa64d;
  }
  
  .score-value.good {
    color: #4d94ff;
  }
  
  .score-value.excellent {
    color: #47c079;
  }
  
  .score-scale {
    margin-top: 1rem;
  }
  
  .scale {
    display: flex;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .segment {
    flex: 1;
  }
  
  .segment.poor {
    background: #ff4d4d;
  }
  
  .segment.fair {
    background: #ffa64d;
  }
  
  .segment.good {
    background: #4d94ff;
  }
  
  .segment.excellent {
    background: #47c079;
  }
  
  .scale-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #777;
    margin-top: 0.3rem;
  }
  
  .eligibility-result {
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 12px;
  }
  
  .eligibility-result h3 {
    margin-bottom: 1rem;
    color: rgba(34, 34, 96, 1);
  }
  
  .eligible {
    color: #47c079;
    font-weight: 500;
  }
  
  .not-eligible {
    color: #ff4d4d;
    font-weight: 500;
  }
  
  .rejection-reasons {
    margin-top: 1.5rem;
  }
  
  .rejection-reasons h4 {
    color: rgba(34, 34, 96, 0.8);
    margin-bottom: 0.5rem;
  }
  
  .rejection-reasons ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .rejection-reasons li {
    margin-bottom: 0.5rem;
    color: #555;
  }
  
  .improvement-note {
    font-style: italic;
    color: #777;
    font-size: 0.9rem;
  }
  
  .loan-options {
    margin-top: 1.5rem;
  }
  
  .loan-options h4 {
    color: rgba(34, 34, 96, 0.8);
    margin-bottom: 0.5rem;
  }
  
  .loan-term {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .loan-term:last-child {
    border-bottom: none;
  }
  
  .loan-term span:first-child {
    color: #555;
  }
  
  .loan-term span:last-child {
    font-weight: 500;
    color: rgba(34, 34, 96, 1);
  }
  
  @media (max-width: 768px) {
    .credit-content {
      flex-direction: column;
    }
    
    .input-row {
      flex-direction: column;
    }
  }
`;

export default Credit;