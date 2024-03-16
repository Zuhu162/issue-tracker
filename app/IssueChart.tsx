"use client";
import { Card } from "@radix-ui/themes";
import React from "react";

import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card className="mt-3">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            style={{ fill: "var(--accent-9" }}
            barSize={60}
            dataKey="value"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
