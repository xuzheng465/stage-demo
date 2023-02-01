import { Modal } from "antd";
import React from "react";
import { useAppState } from "../../state/AppStateContext";
import LeadForm from "../LeadForm";

type AddLeadModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

function AddLeadModal({ isModalOpen, onClose }: AddLeadModalProps) {
  const { curColId } = useAppState();
  console.log(curColId);
  return (
    <>
      <Modal
        title="Add New Lead"
        open={isModalOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={[]}
      >
        <LeadForm onClose={onClose} currentColumnId={curColId} />
      </Modal>
    </>
  );
}

export default AddLeadModal;
