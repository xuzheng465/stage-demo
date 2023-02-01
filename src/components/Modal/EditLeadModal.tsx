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
  const { curColId, getLeadsByListId, curLeadId } = useAppState();

  const leads = getLeadsByListId(curColId!);
  const lead = leads.filter((l) => l.id === curLeadId)[0];

  // useEffect(() => {
  //   return () => {};
  // }, [curLeadId]);

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
          clientName={lead?.content.name}
          rate={lead?.content.rate}
          intend={lead?.content.intend}
          price={lead?.content.price}
          onClose={onClose}
          currentColumnId={curColId}
          isEdit={true}
        />
      </Modal>
    </>
  );
}

export default EditLeadModal;
