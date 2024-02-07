import { Analytics } from "@vercel/analytics/react";
import { Tooltip } from "primereact/tooltip";

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
    <div className="header-content" leading-3>
      <Analytics />
      <Tooltip target=".custom-target-icon" />
      <h1>IndoGitHubers</h1>
      <h2>
        Check Your GitHub Rank{" "}
        <i
          className="custom-target-icon pi pi-info-circle"
          style={{ fontSize: "1.25rem" }}
          data-pr-tooltip={`to be indexed by this app, your GitHub account must meet two requirements:\n\n1. have at least ${data.MinimumFollowerCount} followers.\n2. set 'Indonesia' as your profile location.`}
          data-pr-position="right"
        ></i>
      </h2>
      <h3>
        Last Updated: {formatLastUpdated()}{" "}
        <i
          className="custom-target-icon pi pi-info-circle"
          style={{ fontSize: "1rem" }}
          data-pr-tooltip={`this data is not updated in real time. the data will be updated daily.`}
          data-pr-position="right"
        ></i>
      </h3>
      <h3>
        Embed Your GitHub Rank using{" "}
        <a
          href="https://github.com/depapp/IndoGitHubers/blob/main/BADGE_USAGE.md"
          target="_blank"
        >
          IndoGitHubers-badge
        </a>
      </h3>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <i
          className="pi pi-github"
          style={{ fontSize: "4rem", cursor: "pointer" }}
          onClick={() =>
            window.open("https://github.com/depapp/IndoGitHubers", "_blank")
          }
          title="hit me up on GitHub!"
        ></i>
      </div>
    </div>
  );
};
