import { Modal } from "antd";

import { useAppState } from "../../state/AppStateContext";

import LeadForm from "../LeadForm";

type EditLeadModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

function EditLeadModal({ isModalOpen, onClose }: EditLeadModalProps) {
  const { curLead } = useAppState();
  // const [lead, setLead] = useState<Lead>();

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
          isEdit={true}
        />
      </Modal>
    </>
  );
}

export default EditLeadModal;
