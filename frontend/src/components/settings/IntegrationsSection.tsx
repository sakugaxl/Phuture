import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Settings2,
  CheckCircle2,
  XCircle,
  BarChart,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import axios from "axios";

// Popup window function for opening authentication URLs
function openAuthPopup(url: string, platform: string, onSuccess: () => void, onError: (err: any) => void) {
  const popup = window.open(url, "_blank", "width=600,height=600");

  if (popup) {
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);

        // Check the connection status after the popup is closed
        axios
          .get(`${import.meta.env.VITE_API_URL}/auth/${platform}/status`, {
            params: { userId: "currentUserId" }, // Adjust dynamically
          })
          .then((response) => {
            if (response.data.isConnected) {
              onSuccess();
            } else {
              onError("Failed to connect. Please try again.");
            }
          })
          .catch((err) => onError(err.message || "An error occurred."));
      }
    }, 500);
  } else {
    onError("Failed to open popup. Please check your browser settings.");
  }
}

// Integration connection functions
const handleConnect = (platform: string, connectUrl: string) => {
  openAuthPopup(
    connectUrl,
    platform,
    () => alert(`${platform} connected successfully!`),
    (err) => alert(`Error connecting ${platform}: ${err}`)
  );
};

// Initial integrations data
const integrations = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "blue",
    connectUrl: `${import.meta.env.VITE_API_URL}/auth/facebook`,
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "blue",
    connectUrl: `${import.meta.env.VITE_API_URL}/auth/instagram`,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "blue",
    connectUrl: `${import.meta.env.VITE_API_URL}/auth/linkedin`,
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "blue",
    connectUrl: `${import.meta.env.VITE_API_URL}/auth/twitter`,
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    color: "blue",
    connectUrl: `${import.meta.env.VITE_API_URL}/auth/tiktok`,
  },
  {
    name: "Google AdSense",
    icon: BarChart,
    color: "green",
    connectUrl: `${import.meta.env.VITE_API_URL}/auth/googleAdsense`,
  },
];

const statusColors = {
  connected: "text-green-600",
  "not-connected": "text-red-600",
};

export default function IntegrationsSection() {
  const [statuses, setStatuses] = useState<
    Record<string, "connected" | "not-connected">
  >({
    facebook: "not-connected",
    instagram: "not-connected",
    linkedin: "not-connected",
    twitter: "not-connected",
    tiktok: "not-connected",
    googleAdsense: "not-connected",
  });

  useEffect(() => {
    const checkStatus = async (platform: string) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/${platform}/status`,
          {
            params: { userId: "currentUserId" }, // Adjust dynamically
          }
        );
        if (response.data.isConnected) {
          setStatuses((prev) => ({ ...prev, [platform]: "connected" }));
        }
      } catch (error) {
        console.error(`Error checking ${platform} status:`, error);
      }
    };

    integrations.forEach(({ name }) =>
      checkStatus(name.toLowerCase().replace(" ", ""))
    );
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
      <div className="grid gap-4">
        {integrations.map(({ name, icon: Icon, color, connectUrl }) => {
          const platform = name.toLowerCase().replace(" ", "");
          const isConnected = statuses[platform] === "connected";

          return (
            <div
              key={name}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center">
                <Icon className={`h-5 w-5 mr-3 text-${color}-500`} />
                <span className="font-medium text-gray-900">{name}</span>
              </div>

              <div className="flex items-center">
                <span
                  className={`flex items-center mr-4 text-sm ${
                    statusColors[isConnected ? "connected" : "not-connected"]
                  }`}
                >
                  {isConnected ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-1" />
                      Not Connected
                    </>
                  )}
                </span>

                {!isConnected && (
                  <button
                    onClick={() => handleConnect(platform, connectUrl)}
                    className={`bg-${color}-500 text-white px-4 py-2 rounded-lg hover:bg-${color}-600 transition-colors`}
                  >
                    Connect
                  </button>
                )}

                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Settings2 className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
