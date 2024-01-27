import React from 'react'
import './Privacy.css'
function Privacy() {
  return (
    <div className='privacy-container'>
        <h1>Privacy Policy for MyBlog</h1>
        <hr />
        <p className='privacy-date'>Effective from : 2024</p>
        <p className='privacy-para'>Welcome to MyBlog! Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
        <div className="privacy-info">
            <div className="info-head">1. Information We Collect</div>
            <div className="info-para">We collect information that you provide to us when using MyBlog. This may include your name, email address, profile picture, and other information you choose to share with us.</div>
        </div>
        <div className="privacy-info">
            <div className="info-head">2. How We Use Your Information</div>
            <div className="info-para">We manage accounts, enable blog sharing, and support user interactions.We send important updates via email.</div>
        </div>
        <div className="privacy-info">
            <div className="info-head">3. Your Choices</div>
            <div className="info-para">You can control how your information is used on MyBlog.Your profile information can be edited and updated at any time.</div>
        </div>
        <div className="privacy-info">
            <div className="info-head">4. Security</div>
            <div className="info-para">We prioritize your data's security and employ industry-standard measures. However, please note that no online transmission or storage method can be entirely infallible, and we cannot ensure absolute security.</div>
        </div>
        <div className="privacy-info">
            <div className="info-head">5. Changes to this Privacy Policy</div>
            <div className="info-para">We may update our Privacy Policy to reflect changes in our practices or laws. We will notify you of any important changes.</div>
        </div>
        <div className="privacy-info">
            <div className="info-head">6. Contact Us</div>
            <div className="info-para">If you have any questions, concerns, or requests related to your privacy or this Privacy Policy, please contact us at socials.</div>
        </div>
       <h3>Thank you for using MyBlog!</h3>
    </div>
  )
}

export default Privacy