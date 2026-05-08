import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpoint = getApiEndpoint('activities');

    console.log('[Activities] endpoint:', endpoint);

    const fetchActivities = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('[Activities] fetched data:', data);

        const normalizedItems = Array.isArray(data) ? data : data?.results || [];
        setItems(normalizedItems);
      } catch (err) {
        setError(err.message || 'Failed to fetch activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {items.length === 0 && (
            <li className="list-group-item">No activities found.</li>
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

export default Activities;