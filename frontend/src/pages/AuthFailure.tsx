import React from "react";
import { useSearchParams } from "react-router-dom";

export default function AuthFailure() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform");
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-2xl font-bold text-red-600">Failed</h1>
      <p className="mt-2 text-gray-800">
        There was an issue connecting your {platform}. Please try again.
      </p>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={() => window.close()}
      >
        Close
      </button>
    </div>
  );
}
