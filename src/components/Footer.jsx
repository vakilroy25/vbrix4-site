import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" itemScope itemType="https://schema.org/WPFooter">
      <div className="container">
        <div className="footer-content">
          <img src="/logo.png" alt="vBrix4 Logo - AI workflow and agent platform for design verification" className="footer-logo" />
          <p className="footer-text">
            © {currentYear} <span itemProp="name">vBrix4</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

