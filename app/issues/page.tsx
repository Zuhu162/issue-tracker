import { Issue, PrismaClient, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";

import IssueAction from "./IssueAction";
import IssueStatusFilter from "./list/IssueStatusFilter";
import Pagination from "../components/Pagination";
import IssueTable from "./list/IssueTable";
import { columnNames as columns } from "./list/IssueTable";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  const prisma = new PrismaClient();

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <Flex justify="between">
        <IssueStatusFilter />
        <IssueAction />
      </Flex>
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </div>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
