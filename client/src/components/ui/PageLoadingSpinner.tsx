export default function PageLoadingSpinner() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-bone border-t-primary-600" />
        <p className="text-sm text-secondary-500">Loading...</p>
      </div>
    </div>
  );
}
