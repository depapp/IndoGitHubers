import { Analytics } from "@vercel/analytics/react";
import { Tooltip } from "primereact/tooltip";
import { FilterMatchMode } from "primereact/api";

export const Header = ({ data, lastUpdated }) => {
  const formatLastUpdated = () => {
    if (!lastUpdated) {
      return "";
    }

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const isToday = lastUpdated.toDateString() === today.toDateString();
    const isYesterday = lastUpdated.toDateString() === yesterday.toDateString();
    const isTwoDaysAgo =
      lastUpdated.toDateString() === twoDaysAgo.toDateString();

    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
    const formattedTime = lastUpdated.toLocaleTimeString(
      undefined,
      timeOptions
    );

    if (isToday) {
      return `Today at ${formattedTime} WIB`;
    } else if (isYesterday) {
      return `Yesterday at ${formattedTime} WIB`;
    } else if (isTwoDaysAgo) {
      return `2 Days Ago at ${formattedTime} WIB`;
    } else {
      return lastUpdated.toLocaleDateString();
    }
  };

  return (
    <div className="header-content">
        <Analytics />
        <Tooltip target=".custom-target-icon" />
        <h1>IndoGitHubers</h1>
        <h2>
            Check Your GitHub Rank{" "}
            <i
                className="custom-target-icon pi pi-info-circle"
                style={{ fontSize: "1.25rem" }}
                data-pr-tooltip={`your GitHub account needs to have at least ${data.MinimumFollowerCount} followers to be on the list.`}
                data-pr-position="right"
            ></i>
        </h2>
        <h3>
            Last Updated: {formatLastUpdated()}{" "}
            <i
                className="custom-target-icon pi pi-info-circle"
                style={{ fontSize: "1rem" }}
                data-pr-tooltip={`this data is not updated in real time. the data will be updated every 2 days.`}
                data-pr-position="right"
            ></i>
        </h3>
    </div>
);
};
