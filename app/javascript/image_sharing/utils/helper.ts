export interface ApiResponseSuccess extends Record<string, any> { }
export interface ApiResponseError extends Error {
  data?: Record<string, any>
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest' // make backwards compatible with rails "request.xhr?"
};

function getCsrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta?.getAttribute('content') || '';
}

/**
 * Build a query string from an object
 */
export function serialize(obj: Record<string, any>, prefix: string): string {
  const parts: string[] = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      const param = prefix ? `${prefix}[${key}]` : key;
      const value = obj[key];

      if (typeof (value) === 'object') {
        parts.push(serialize(value, param));
      } else {
        parts.push(`${encodeURIComponent(param)}=${encodeURIComponent(value)}`);
      }
    }
  });
  return parts.join('&');
}

/**
 * Checks the response code of an HTTP response.
 * For 200 responses a Promise for the JSON is returned.  Otherwise an error is thrown
 */
function checkResponseStatus(res: Response): ApiResponse {
  const status = res.status;
  if (status === 204) {
    return Promise.resolve(); // No content
  } else if (status === 302) {
    window.location.reload();
    return Promise.reject();
  } else if (status === 401 || status === 403) {
    window.location.reload();
    return Promise.reject();
  } else if (status < 200 || status >= 300) {
    return res
      .text()
      .then((text) => {
        let error = new Error(res.statusText);
        try {
          const data = JSON.parse(text);
          (<any>error).data = data;
        } catch (e) {
          if (text) {
            error = new Error(text);
          }
        }
        throw error;
      });
  }
  return res.json();
}

/**
 * Perform an HTTP POST to the API and parse the response as JSON
 */
export function post(path: string, body: Record<string, any>): Promise<ApiResponse> {
  return fetch(path, {
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers: Object.assign({ 'X-CSRF-Token': getCsrfToken() }, HEADERS),
    method: 'POST',
    redirect: 'error',
  }).then(checkResponseStatus);
}
