import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../api';

// Codespaces endpoint reference: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/teams/

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const endpoint = getApiEndpoint('teams');

    console.log('[Teams] endpoint:', endpoint);

    const fetchTeams = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('[Teams] fetched data:', data);

        const normalizedItems = Array.isArray(data) ? data : data?.results || [];
        setItems(normalizedItems);
      } catch (err) {
        setError(err.message || 'Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <ul className="list-group">
          {items.length === 0 && (
            <li className="list-group-item">No teams found.</li>
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

export default Teams;