import { useMemo, useState } from 'react';

function getRowId(item, index) {
  return item?.id || item?._id || `row-${index + 1}`;
}

function getRowSummary(item) {
  const entries = Object.entries(item || {}).filter(
    ([key, value]) => key !== 'id' && key !== '_id' && value !== null && value !== undefined
  );

  const firstUseful = entries.find(([, value]) => ['string', 'number', 'boolean'].includes(typeof value));
  if (firstUseful) {
    return `${firstUseful[0]}: ${String(firstUseful[1])}`;
  }

  return 'No summary fields';
}

function getRowPreview(item) {
  return JSON.stringify(item).slice(0, 120);
}

function DataTableCard({
  title,
  endpoint,
  items,
  loading,
  error,
  onRefresh,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(term));
  }, [items, searchTerm]);

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-header bg-white border-0 pt-4 px-4 pb-2">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <h2 className="h4 fw-bold text-primary-emphasis mb-0">{title}</h2>
          <span className="badge text-bg-primary rounded-pill">{filteredItems.length} rows</span>
        </div>
        <a className="link-primary small" href={endpoint} target="_blank" rel="noreferrer">
          API endpoint
        </a>
      </div>

      <div className="card-body px-4 pb-4">
        <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label className="form-label mb-1" htmlFor={`${title}-filter`}>
              Filter records
            </label>
            <input
              id={`${title}-filter`}
              className="form-control"
              type="text"
              placeholder="Type to filter current rows"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex gap-2 pt-md-4">
            <button className="btn btn-primary" type="button" onClick={onRefresh}>
              Refresh
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={() => setSearchTerm('')}>
              Clear
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info mb-0">Loading records...</div>}
        {error && <div className="alert alert-danger mb-0">Error: {error}</div>}

        {!loading && !error && (
          <div className="table-responsive rounded-3 border">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '15%' }}>ID</th>
                  <th scope="col" style={{ width: '35%' }}>Summary</th>
                  <th scope="col" style={{ width: '35%' }}>Data Preview</th>
                  <th scope="col" style={{ width: '15%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No records found.
                    </td>
                  </tr>
                )}
                {filteredItems.map((item, index) => (
                  <tr key={getRowId(item, index)}>
                    <td className="text-nowrap fw-semibold">{getRowId(item, index)}</td>
                    <td>{getRowSummary(item)}</td>
                    <td className="text-muted small">{getRowPreview(item)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="button"
                        onClick={() => setSelectedItem(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title h5 mb-0">{title} Record Details</h3>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setSelectedItem(null)}
                />
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </div>
      )}
    </div>
  );
}

export default DataTableCard;