"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const CAL_NAMESPACE = "30min";
const CAL_LINK = "team-codizzz/30min";

export default function CalBooking() {
  const { theme } = useTheme();

  useEffect(() => {
    let active = true;

    void getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      if (!active) return;
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: { brandColor: theme === "dark" ? "#E72700" : "#FF8800" },
          body: { background: theme === "dark" ? "#100F0E" : "#F7F4EE" },
        },
      });
    });

    return () => { active = false; };
  }, [theme]);

  return (
    <div className="booking-calendar" aria-label="Schedule a 30-minute conversation with Codizzz">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        className="booking-calendar__embed"
        config={{
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
          theme,
        }}
      />
    </div>
  );
}
