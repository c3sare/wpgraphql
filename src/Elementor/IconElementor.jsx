import React from "react";
import { getIcon } from "../fontawesome/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { device } from "../mediaquery/size";

const flexAlign = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  ${(props) => `justify-content: ${flexAlign[props.align_desktop]};`}

  ${(props) =>
    props.align_tablet
      ? `
        @media ${device.tablet} {
            justify-content: ${flexAlign[props.align_tablet]}
        }
    `
      : ""}

    ${(props) =>
    props.align_mobile
      ? `
        @media ${device.mobile} {
            justify-content: ${flexAlign[props.align_mobile]};
        }
    `
      : ""}
`;

const IconBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min-content;
  height: min-content;
  ${(props) =>
    !props.shape && (props.view === "stacked" || props.view === "framed")
      ? props.border_radius
        ? `border-radius: ${props.border_radius.top || 0}${
            props.border_radius.unit
          } ${props.border_radius.right || 0}${props.border_radius.unit} ${
            props.border_radius.bottom || 0
          }${props.border_radius.unit} ${props.border_radius.left || 0}${
            props.border_radius.unit
          };`
        : `border-radius: 50%;`
      : ""}
  ${(props) => (props.view === "framed" ? `border: 3px solid #6EC1E4;` : "")}
  ${(props) => (props.view === "stacked" ? `background-color: #6EC1E4;` : "")}

  ${(props) =>
    props.size_tablet?.size !== ""
      ? `
        @media ${device.tablet} {
            font-size: ${
              props.size_tablet?.size + "" + props.size_tablet?.unit
            };
        }
    `
      : ""}

  ${(props) =>
    props.size_mobile?.size !== ""
      ? `
        @media ${device.mobile} {
            font-size: ${
              props.size_mobile?.size + "" + props.size_mobile?.unit
            };
        }
    `
      : ""}
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.sizeIcon.size + "" + props.sizeIcon.unit};
  width: ${(props) => props.sizeIcon.size + "" + props.sizeIcon.unit};
  height: ${(props) => props.sizeIcon.size + "" + props.sizeIcon.unit};
  padding: ${(props) => props.icon_padding.size + "" + props.icon_padding.unit};
  ${(props) => (props.view === "stacked" ? `color: white;` : "")}
`;

const IconElementor = (props) => {
  const {
    selected_icon,
    align = "center",
    align_tablet,
    align_mobile,
    size = { size: 50, unit: "px" },
    size_tablet,
    border_radius,
    size_mobile,
    rotate,
    view,
    shape,
    icon_padding = { size: 25, unit: "px" },
  } = props;
  console.log(props);

  return (
    <IconContainer
      align_desktop={align}
      align_tablet={align_tablet}
      align_mobile={align_mobile}
    >
      <IconBorder
        size={size}
        size_tablet={size_tablet}
        size_mobile={size_mobile}
        view={view}
        shape={shape}
        border_radius={border_radius}
      >
        <Icon
          sizeIcon={size}
          icon_padding={icon_padding}
          view={view}
          rotate={rotate?.size || null}
          color={"#6EC1E4"}
          icon={getIcon(
            selected_icon?.library || "fa-regular",
            selected_icon?.value?.split(" ")[1] || "fa-star"
          )}
        />
      </IconBorder>
    </IconContainer>
  );
};

export default IconElementor;
