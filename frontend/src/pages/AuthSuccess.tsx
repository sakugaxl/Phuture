import { useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-2xl font-bold text-green-600">Success!</h1>
      <p className="mt-2 text-gray-800">
        You have successfully connected your {platform}. You may now close this window and return to the app.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        onClick={() => window.close()}
      >
        Close
      </button>
    </div>
  );
}
