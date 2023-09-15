"use client";
import Button from "@/components/actions/button/Button";
import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import ChartSummary from "@/components/dataDisplay/chartSummary/ChartSummary";
import Table from "@/components/dataDisplay/table/Table";
import TableRow from "@/components/dataDisplay/tableRow/TableRow";
import Modal from "@/components/feedback/modal/Modal";
import GroupForm from "@/components/forms/groupForm/GroupForm";
import useGetGroups from "@/hooks/useGetGroups";
import useGetPack from "@/hooks/useGetPack";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  const supabase = createClientComponentClient<Database>();
  const { pack, setPack, error, isLoading, isValidating } = useGetPack({
    packID: params.id,
  });
  const { currency } = useGetPreferredCurrency();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const {
    groups,
    setGroups,
    isLoading: isLoadingGroups,
  } = useGetGroups({
    packID: params.id,
  });

  const onDeleteGroup = async (id: number) => {
    const { error } = await supabase.from("group").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this group.");
      return;
    }
    setGroups(groups.filter((item) => item.id !== id));
    toast.success("Deleted group.");
  };

  return (
    <>
      {pack && (
        <>
          <h1 className="text-3xl font-semibold text-header-1">{pack.title}</h1>
          <h2 className="font-medium text-header-2 mt-1 max-w-2xl">
            {pack.description}
          </h2>
          <section className="mt-8 flex flex-wrap justify-between gap-3">
            <ChartSummary data={[]} />
            <PackSummary data={{ ...pack, currency }} />
          </section>
          <section className="flex flex-col gap-10 mt-12">
            {groups.length > 0 &&
              groups.map((group) => (
                <Table
                  key={group.id}
                  title={group.title}
                  groupID={group.id}
                  onAddItem={() => {}}
                  onDeleteGroup={() => onDeleteGroup(group.id)}
                />
              ))}
          </section>
          <section className="mt-5">
            <Button onClick={() => setShowAddGroupModal(!showAddGroupModal)}>
              Add Group
            </Button>
            {showAddGroupModal && (
              <Modal>
                <GroupForm
                  packID={Number(params.id)}
                  onClose={() => setShowAddGroupModal(false)}
                />
              </Modal>
            )}
          </section>
          <section></section>
        </>
      )}
    </>
  );
}
