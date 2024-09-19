import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

function AzureLogin() {
  const { instance, accounts } = useMsal();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const navigate = useNavigate();


  const login = async () => {
    if (isLoggingIn) {
      return;
    }
    setIsLoggingIn(true);
    try {
      await instance.loginPopup({
        scopes: ['https://connectionet.onmicrosoft.com/appnote/read'],
        prompt: 'select_account',
      });
    } catch (error) {
      console.error('Login error:', error);
      console.log('Error details:', JSON.stringify(error, null, 2));
    }
  };


  const logout = () => {
    setIsLoggingIn(false);
    instance.logoutPopup();
    setIsDropdownOpen(false); // Close the dropdown on logout
    navigate('/');
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const isAuthenticated = accounts.length > 0;


  return (
    <AzureLoginStyled>
      <div className="App">
        {!isAuthenticated ? (
          <button onClick={login} disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        ) : (
          <div className="profile-section">
            <button className="profile-button" onClick={toggleDropdown}>
              Profile
            </button>
            {isDropdownOpen && (
              <div className="dropdown">
                <p>{accounts[0].username}</p>
                <p>{accounts[0].name}</p>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </AzureLoginStyled>
  );
}


// Styled components for the profile dropdown
const AzureLoginStyled = styled.div`
  .profile-section {
    position: relative;
    display: inline-block;

    .profile-button {
      background-color: #0078d4;
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 3px;
      &:hover {
        background-color: #005a9e;
      }
    }


    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #ffffff;
      color: #333;
      padding: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 10;
      border-radius: 4px;
      width: 200px;


      p {
        margin: 5px 0;
      }


      button {
        margin-top: 10px;
        background-color: #f44336;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;

        &:hover {
          background-color: #d32f2f;
        }
      }
    }
  }
`;


export default AzureLogin;
