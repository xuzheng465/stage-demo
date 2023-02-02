import { Modal } from "antd";

import LeadForm from "../LeadForm";

type AddLeadModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

function AddLeadModal({ isModalOpen, onClose }: AddLeadModalProps) {
  // useEffect(() => {
  //   if (typeof reset !== "undefined") {
  //     reset();
  //   }
  //   console.log("check");
  // }, [curColId, reset]);

  return (
    <>
      <Modal
        title="Add New Lead"
        open={isModalOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={[]}
      >
        <LeadForm isEdit={false} onClose={onClose} />
      </Modal>
    </>
  );
}

export default AddLeadModal;
