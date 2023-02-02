import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useAppState } from "../../state/AppStateContext";
import { Lead, LeadContent } from "../../state/appStateReducer";
import LeadForm from "../LeadForm";

type EditLeadModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

function EditLeadModal({ isModalOpen, onClose }: EditLeadModalProps) {
  const { curColId, getLeadsByListId, curLeadId, curLead } = useAppState();
  // const [lead, setLead] = useState<Lead>();
  console.log("edit - ", curLead);
  return (
    <>
      <Modal
        title="Edit New Lead"
        open={isModalOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={[]}
      >
        <LeadForm
          clientName={curLead?.content.name}
          rate={curLead?.content.rate}
          intend={curLead?.content.intend}
          price={curLead?.content.price}
          onClose={onClose}
          currentColumnId={curColId}
          isEdit={true}
        />
      </Modal>
    </>
  );
}

export default EditLeadModal;
