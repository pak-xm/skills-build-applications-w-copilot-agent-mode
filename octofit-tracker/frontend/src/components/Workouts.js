import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

// Codespaces endpoint reference: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpoint = getApiEndpoint('workouts');

    console.log('[Workouts] endpoint:', endpoint);

    const fetchWorkouts = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('[Workouts] fetched data:', data);

        const normalizedItems = Array.isArray(data) ? data : data?.results || [];
        setItems(normalizedItems);
      } catch (err) {
        setError(err.message || 'Failed to fetch workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {items.length === 0 && (
            <li className="list-group-item">No workouts found.</li>
          )}
          {items.map((item, index) => (
            <li className="list-group-item" key={item.id || item._id || index}>
              <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;