import { PrismaClient } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const prisma = new PrismaClient();

  const open = await prisma.issue.count({ where: { status: "OPEN" } });

  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div>
      <LatestIssues />
      <IssueSummary
        open={open}
        inProgress={inProgress}
        closed={closed}
      ></IssueSummary>
      <IssueChart
        open={open}
        inProgress={inProgress}
        closed={closed}
      ></IssueChart>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
