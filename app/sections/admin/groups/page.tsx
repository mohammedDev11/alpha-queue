import PageIntro from "@/app/components/shared/page/Text/PageIntro";
import PrintingGroupsTable from "./components/PrintingGroupsTable";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <PageIntro
        title="Groups"
        description="Organize users into groups to manage permissions and printing policies efficiently."
      />
      <PrintingGroupsTable />
    </div>
  );
};

export default page;
