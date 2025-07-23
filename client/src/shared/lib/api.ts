const API = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return await res.json();
}
