import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer); // Cleanup! Cancel timer if user navigates away
  }, [navigate]);

  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <p className="redirect-notice">Redirecting you home in 5 seconds...</p>
      <Link to="/" className="home-btn">← Go home now</Link>
    </div>
  );
}

export default NotFound;