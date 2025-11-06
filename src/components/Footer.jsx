import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <img src="/logo.png" alt="vBrix4 Logo" className="footer-logo" />
          <p className="footer-text">© {currentYear} vBrix4. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

