export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="mb-6 bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-xl">
      {message}
    </div>
  );
}
