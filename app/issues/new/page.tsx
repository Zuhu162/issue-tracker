import dynamic from "next/dynamic";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
});

import delay from "delay";

const NewIssuePage = async () => {
  await delay(1000);

  return <IssueForm />;
};

export default NewIssuePage;
