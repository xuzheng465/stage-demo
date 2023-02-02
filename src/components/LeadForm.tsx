import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { addLead, updateLead } from "../state/actions";
import { useAppState } from "../state/AppStateContext";
import { LeadContent } from "../state/appStateReducer";

type LeadFormProps = {
  onClose: () => void;

  isEdit: boolean;
} & Partial<LeadFormValue>;

type LeadFormValue = {
  clientName: string;
  rate: string;
  intend: string;
  price: string;
};

function LeadForm({
  onClose,
  isEdit,

  clientName = "",
  rate = "",
  intend = "",
  price = "",
}: LeadFormProps) {
  const { dispatch, curColId, curLeadId } = useAppState();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [clientName, rate, intend, price, curLeadId, form]);

  const onFinish = (values: LeadFormValue) => {
    const newLead: LeadContent = {
      name: values.clientName,
      rate: values.rate,
      intend: values.intend,
      sale: "Tuo",
      stage: curColId,
      price: values.price,
    };

    if (isEdit) {
      // dispatch edit
      dispatch(updateLead(newLead, curColId!, curLeadId!));
    } else {
      dispatch(addLead(newLead, curColId));
    }

    form.resetFields();
    onClose();
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        initialValues={{ clientName, rate, intend, price }}
        onFinish={onFinish}
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        <Form.Item
          label="客户姓名"
          name="clientName"
          rules={[{ required: true, message: "请输入客户姓名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="评级"
          name="rate"
          rules={[{ required: true, message: "请选择评级" }]}
        >
          <Select>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
            <Select.Option value="C">C</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="意向车型"
          name="intend"
          rules={[{ required: true, message: "请选择意向车型" }]}
        >
          <Select>
            <Select.Option value="BMW">BMW</Select.Option>
            <Select.Option value="MINI">MINI</Select.Option>
            <Select.Option value="BMW摩托车">BMW摩托车</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="订单金额"
          name="price"
          rules={[{ required: true, message: "请输入订单金额" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LeadForm;
