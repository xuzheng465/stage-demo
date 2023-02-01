import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useAppState } from "../../state/AppStateContext";
import LeadForm from "../LeadForm";

type AddLeadModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

function AddLeadModal({ isModalOpen, onClose }: AddLeadModalProps) {
  const { curColId } = useAppState();

  const [reset, setReset] = useState<() => void>();

  // useEffect(() => {
  //   if (typeof reset !== "undefined") {
  //     reset();
  //   }
  //   console.log("check");
  // }, [curColId, reset]);

  console.log("Add Lead Modal ", curColId);
  return (
    <>
      <Modal
        title="Add New Lead"
        open={isModalOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={[]}
      >
        <LeadForm isEdit={false} onClose={onClose} currentColumnId={curColId} />
      </Modal>
    </>
  );
}

export default AddLeadModal;
