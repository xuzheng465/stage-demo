import { useRef } from "react";
import { useAppState } from "./state/AppStateContext";
import { CardContainer } from "./styles";
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";
import {
  moveLead,
  setCurrentColId,
  setCurrentLeadId,
  setDraggedItem,
} from "./state/actions";
import { throttle } from "throttle-debounce-ts";
import { useDrop } from "react-dnd";
import { Card as CardAnt, Dropdown, MenuProps, message } from "antd";
import {
  StockOutlined,
  ShareAltOutlined,
  UserOutlined,
  EllipsisOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { LeadContent } from "./state/appStateReducer";

type CardProps = {
  text: string;
  id: string;
  columnId: string;
  content: LeadContent;
  isPreview?: boolean;
  showEditLeadModal: () => void;
};

const Card = ({
  text,
  id,
  columnId,
  isPreview,
  content,
  showEditLeadModal,
}: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
    content,
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) return;

      if (draggedItem.type !== "CARD") return;

      if (draggedItem.id === id) {
        return;
      }
      dispatch(moveLead(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    }),
  });
  drag(drop(ref));

  const items: MenuProps["items"] = [
    {
      label: <a href="#客户档案">客户档案</a>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: <a href="#任务流">任务流</a>,
      key: "2",
      icon: <ShareAltOutlined />,
    },
    {
      label: <a href="#轨迹">轨迹</a>,
      key: "3",
      icon: <StockOutlined />,
    },
    {
      label: <div>删除</div>,
      key: "4",
      icon: <WarningOutlined />,
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
      onClick={() => {
        dispatch(setCurrentLeadId(id));
        dispatch(setCurrentColId(columnId));
        showEditLeadModal();
      }}
    >
      <CardAnt
        size="small"
        title={"客户姓名: " + content.name}
        extra={
          <Dropdown menu={{ items }} placement="bottom">
            <EllipsisOutlined />
          </Dropdown>
        }
      >
        <p>评级: {content.rate}</p>
        <p>意向车型: {content.intend}</p>
        <p>所属销售: {content.sale}</p>
        <p>订单金额: {content.price}</p>
      </CardAnt>
    </CardContainer>
  );
};

export default Card;
