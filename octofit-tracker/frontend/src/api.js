function getCodespaceApiBaseUrl() {
  const configuredCodespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (configuredCodespaceName) {
    return `https://${configuredCodespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined' && window.location?.hostname?.includes('.app.github.dev')) {
    const apiHost = window.location.hostname.replace('-3000.', '-8000.');
    if (apiHost !== window.location.hostname) {
      return `https://${apiHost}`;
    }
  }

  return 'http://localhost:8000';
}

export function getApiEndpoint(resourceName) {
  return `${getCodespaceApiBaseUrl()}/api/${resourceName}/`;
}
