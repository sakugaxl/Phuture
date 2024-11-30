import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Settings2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { BarChart } from "lucide-react";
import axios from "axios";

// Popup window function for opening authentication URLs
function openAuthPopup(url: string) {
  const popup = window.open(url, "_blank", "width=600,height=600");
  if (popup) {
    popup.focus();
  }
}

// Integration connection functions
const handleInstagramConnect = () =>
  openAuthPopup(
    "https://phuturesync-panel-m9b510nz4-sakugacodeworks.vercel.app/auth/instagram"
  );
const handleFacebookConnect = () =>
  openAuthPopup(
    "https://phuturesync-panel-m9b510nz4-sakugacodeworks.vercel.app/auth/facebook"
  );
const handleLinkedInConnect = () =>
  openAuthPopup(
    "https://phuturesync-panel-m9b510nz4-sakugacodeworks.vercel.app/auth/linkedin"
  );
const handleTwitterConnect = () =>
  openAuthPopup(
    "https://phuturesync-panel-m9b510nz4-sakugacodeworks.vercel.app/auth/twitter"
  );
const handleTikTokConnect = () =>
  openAuthPopup(
    "https://phuturesync-panel-m9b510nz4-sakugacodeworks.vercel.app/auth/tiktok"
  );
const handleGoogleAdSenseConnect = () =>
  openAuthPopup(
    "https://phuturesync-panel-m9b510nz4-sakugacodeworks.vercel.app/auth/googleAdsense"
  );

// Initial integrations data
const integrations = [
  {
    name: "Facebook",
    icon: Facebook,
    status: "not-connected",
    color: "blue",
    connect: handleFacebookConnect,
  },
  {
    name: "Instagram",
    icon: Instagram,
    status: "not-connected",
    color: "blue",
    connect: handleInstagramConnect,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    status: "not-connected",
    color: "blue",
    connect: handleLinkedInConnect,
  },
  {
    name: "Twitter",
    icon: Twitter,
    status: "not-connected",
    color: "blue",
    connect: handleTwitterConnect,
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    status: "not-connected",
    color: "blue",
    connect: handleTikTokConnect,
  },
  {
    name: "Google AdSense",
    icon: BarChart,
    status: "not-connected",
    color: "green",
    connect: handleGoogleAdSenseConnect,
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
          `http://localhost:5000/auth/${platform}/status`,
          {
            params: { userId: "currentUserId" }, // Adjust as necessary to fetch the userId dynamically
          }
        );
        if (response.data.isConnected) {
          setStatuses((prev) => ({ ...prev, [platform]: "connected" }));
        }
      } catch (error) {
        console.error(`Error checking ${platform} status:`, error);
      }
    };

    // Check connection status for each platform
    [
      "facebook",
      "instagram",
      "linkedin",
      "twitter",
      "tiktok",
      "googleAdsense",
    ].forEach((platform) => checkStatus(platform));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
      <div className="grid gap-4">
        {integrations.map((integration) => {
          const isConnected =
            statuses[integration.name.toLowerCase().replace(" ", "")] ===
            "connected";

          return (
            <div
              key={integration.name}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center">
                <integration.icon
                  className={`h-5 w-5 mr-3 text-${integration.color}-500`}
                />
                <span className="font-medium text-gray-900">
                  {integration.name}
                </span>
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
                    onClick={integration.connect}
                    className={`bg-${integration.color}-500 text-white px-4 py-2 rounded-lg hover:bg-${integration.color}-600 transition-colors`}
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
