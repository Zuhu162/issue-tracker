import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <div>
      <LatestIssues />
      <IssuesSummary open={10}></IssuesSummary>
    </div>
  );
}
