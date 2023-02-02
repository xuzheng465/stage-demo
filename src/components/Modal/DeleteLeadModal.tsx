import { Modal } from "antd";
import { deleteLead } from "../../state/actions";
import { useAppState } from "../../state/AppStateContext";

type DeleteLeadModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

function DeleteLeadModal({ isModalOpen, onClose }: DeleteLeadModalProps) {
  const { curColId, dispatch, curLeadId, curLead } = useAppState();
  return (
    <>
      <Modal
        title="删除线索"
        open={isModalOpen}
        onOk={() => {
          dispatch(deleteLead(curLeadId, curColId));
          onClose();
        }}
        onCancel={onClose}
        okText="确认"
        cancelText="取消"
      >
        <p>是否要删除这个线索</p>
        <p>姓名: {curLead?.content.name}</p>
        <p>评级: {curLead?.content.rate}</p>
        <p>意向车型: {curLead?.content.intend}</p>
        <p>所属销售: {curLead?.content.sale}</p>
        <p>订单金额: {curLead?.content.price}</p>
      </Modal>
    </>
  );
}

export default DeleteLeadModal;
