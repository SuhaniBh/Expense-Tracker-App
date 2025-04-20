import { useEffect } from 'react';

function Stock() {
  useEffect(() => {
    window.location.href = 'http://localhost:8501/';
  }, []);

  return (
    <div>
      <p>Redirecting to Stock Dashboard...</p>
    </div>
  );
}

export default Stock;
