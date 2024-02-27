import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const IsseuFormSkeleton = () => {
  return (
    <Box className="max-w-wl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IsseuFormSkeleton;
