"use client";

import { Issue, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const assignIssue = async (userId: string) => {
    try {
      if (userId === " ") {
        await axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserID: null,
        });
        router.refresh();
      } else {
        await axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserID: userId,
        });
        router.refresh();
      }
    } catch (err) {
      notify();
    }
  };

  const router = useRouter();
  const notify = () =>
    toast("There was an error in the server. Please try again");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  });

  if (loading) return <Skeleton />;

  return (
    <Select.Root onValueChange={assignIssue}>
      <Select.Trigger
        variant="surface"
        placeholder={
          users.find((user) => user.id === issue.assignedToUserID)?.name ||
          "Unassigned"
        }
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value=" ">Unassigned</Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
