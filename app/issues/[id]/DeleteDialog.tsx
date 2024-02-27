import { Dialog, Text } from "@radix-ui/themes";
import React from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import { string } from "zod";

const DeleteDialog = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Text>Are you sure you want to delete this Issue?</Text>
      <DeleteIssueButton issueId={issueId} />
    </>
  );
};

export default DeleteDialog;
