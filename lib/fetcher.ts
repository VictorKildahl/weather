export function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  });
}
