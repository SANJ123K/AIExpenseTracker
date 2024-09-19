import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterStyled>
      <div className="container">
        <div className="contact-details">
          <h2>Contact Us</h2>
          <ul>
            <li>
              <strong>Email:</strong> 
              <a href="mailto:sanjeevlodhi642@gmail.com">sanjeevlodhi642@gmail.com</a>
            </li>
            <li>
              <strong>LinkedIn:</strong> 
              <a href="https://www.linkedin.com/in/sanjeev-kumar-123456789/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </li>
            <li>
              <strong>Instagram:</strong> 
              <a href="https://www.instagram.com/sanjeev_kumar/" target="_blank" rel="noopener noreferrer">Instagram Profile</a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Sanjeev Kumar. All rights reserved.</p>
        </div>
      </div>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .contact-details {
    text-align: center;
  }

  .contact-details h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
  }

  .contact-details ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .contact-details li {
    margin: 10px 0;
    font-size: 1.2em;
  }

  .contact-details li a {
    color: #ecf0f1;
    text-decoration: none;
    margin-left: 10px;
    font-weight: bold;
  }

  .contact-details li a:hover {
    text-decoration: underline;
  }

  .footer-bottom {
    margin-top: 20px;
    text-align: center;
  }

  .footer-bottom p {
    margin: 0;
    font-size: 0.9em;
  }
`;

export default Footer;
