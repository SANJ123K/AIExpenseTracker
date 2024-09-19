import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/globalContext';

function IncomeHistory() {
  const { incomes = [], deleteIncome, updateIncome } = useGlobalContext();
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', amount: '', date: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleUpdate = useCallback((item) => {
    // Populate form fields with selected item's data
    setCurrentItem(item);
    setFormData({
      id: item._id,
      title: item.title,
      amount: item.amount,
      date: formatDateToInput(item.date), // Convert date to "yyyy-MM-dd"
    });
    setShowPopup(true);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Only update the modified field
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Only update if formData has been changed
    const updatedData = { ...currentItem, ...formData };

    // Prevent unnecessary re-requests or submissions
    updateIncome(updatedData)
      .then(() => {
        setShowPopup(false);
        setCurrentItem(null);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentItem(null);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  const displayedData = incomes.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Format date for display
  const handleDate = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getDate().toString().padStart(2, '0'); 
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Convert date to "yyyy-MM-dd" format for input
  const formatDateToInput = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <StyledHistoryContainer>
      <h2>Income History</h2>
      <ul>
        {displayedData.map((item) => (
          <li key={item._id}>
            <div className="income-details">
              <span>{item.title}</span>
              <span>₹{item.amount}</span>
              <span>{handleDate(item.date)}</span>
            </div>
            <div className="actions">
              <button onClick={() => handleUpdate(item)}>Update</button>
              <button onClick={() => deleteIncome(item._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {incomes.length > itemsPerPage && (
        <div className="pagination-controls">
          {currentPage > 0 && <button onClick={handlePreviousPage}>Previous Page</button>}
          {displayedData.length === itemsPerPage && <button onClick={handleNextPage}>Next Page</button>}
        </div>
      )}

      {showPopup && (
        <Popup>
          <div className="popup-content">
            <h2>Update Income</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" >Update</button>
              <button type="button" onClick={closePopup}>Close</button>
            </form>
          </div>
        </Popup>
      )}
    </StyledHistoryContainer>
  );
}





const StyledHistoryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #232f3e;
    font-size: 24px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 20px;
    background-color: rgba(255, 255, 0, 0.1); /* Light yellow with low opacity */
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* "Bulging out" effect */
    font-size: 18px;
    font-weight: bold;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%); /* Subtle gradient */
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-5px); /* Lift on hover */
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
  }

  .income-details {
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;

    span {
      font-size: 16px;
      color: #333;
    }

    .amount {
      color: green; /* Amount in green */
    }
  }

  .actions {
    display: flex;
    gap: 10px;

    button {
      padding: 8px 12px;
      background-color: #232f3e;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: all 0.3s ease;

      &:hover {
        background-color: red;
      }
    }
  }

  .pagination-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
      padding: 10px 20px;
      background-color: #232f3e;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #1b242d;
      }
    }
  }

  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    padding: 15px;

    h2 {
      font-size: 20px;
    }

    ul {
      font-size: 16px;
    }

    li {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px;
    }

    .income-details {
      flex-direction: column;
      align-items: flex-start;
      margin-right: 0;
      gap: 5px;

      span {
        font-size: 14px;
      }
    }

    .actions {
      width: 100%;
      justify-content: flex-end;
      gap: 5px;

      button {
        width: 48%;
        padding: 10px;
        font-size: 12px;
      }
    }

    .pagination-controls {
      flex-direction: column;
      align-items: center;
      button {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 18px;
    }

    ul {
      font-size: 14px;
    }

    li {
      padding: 10px;
    }

    .income-details span {
      font-size: 12px;
    }

    .actions button {
      font-size: 10px;
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  .popup-content {
    text-align: center;

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;

      label {
        display: flex;
        flex-direction: column;
        text-align: left;

        input {
          margin-top: 5px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
        }
      }

      button {
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #232f3e;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          background-color: #1b242d;
        }
      }

      button[type='button'] {
        background-color: #ccc;
        color: black;

        &:hover {
          background-color: #bbb;
        }
      }
    }
  }
`;

export default IncomeHistory;
