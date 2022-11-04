import React from "react";
import { getIcon } from "../fontawesome/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "gatsby";
import { device } from "../mediaquery/size";
import { getColor } from "./Heading";

const flexAlign = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  ${(props) => `justify-content: ${flexAlign[props.align]};`}

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

const IconBorderHover = (props) => {
  const className = `${props.className}${props.hover_animation ? ` elementor-animation-${props.hover_animation}` : ""}`;

  return (
    <div className={className}>
      {props.children}
    </div>
  )

}

const IconBorder = styled(IconBorderHover)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min-content;
  height: min-content;
  ${props =>
    props.hover_primary_color || props.hover_secondary_color || props.__globals__.hover_primary_color || props.__globals__.hover_secondary_color ? 
      `transition color 0.4s, background-color 0.4s, border 0.4s;` : ""
  }
  ${(props) => 
    `
      color: ${props.view ? (props.view === "stacked" ? (props.secondary_color || (getColor(props.__globals__?.secondary_color || "white"))) : props.primary_color || getColor(props.__globals__?.primary_color || "=primary")) : getColor(props.__globals__?.primary_color || "=primary")};
    `
  }
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
  ${(props) => (
    props.view === "framed" ?
      `border: 3px solid ${
        props.primary_color || getColor(props.__globals__?.primary_color || "=primary")
      };
      ${props.border_width ? `border-width: ${props.border_width.top}${props.border_width.unit} ${props.border_width.right}${props.border_width.unit} ${props.border_width.bottom}${props.border_width.unit} ${props.border_width.left}${props.border_width.unit};` : ""}
      ` : ""
  )}
  ${(props) => (["stacked", "framed"].includes(props.view) ? `background-color: ${props.view === "stacked" ? (props.primary_color || getColor(props.__globals__?.primary_color || "=primary")) : (props.secondary_color || getColor(props.__globals__?.secondary_color || "white"))};` : "")}

  ${(props) =>
    props.size_tablet?.size
      ? `
        @media ${device.tablet} {
            font-size: ${
              props.size_tablet?.size + "" + props.size_tablet?.unit
            };
        }
    `
      : ""}

  ${(props) =>
    props.size_mobile?.size
      ? `
        @media ${device.mobile} {
            font-size: ${
              props.size_mobile?.size + "" + props.size_mobile?.unit
            };
        }
    `
      : ""}
  ${props => 
    props.hover_primary_color || props.hover_secondary_color || props.__globals__.hover_primary_color || props.__globals__.hover_secondary_color ? `
      &:hover {
        ${["stacked", "framed"].includes(props.view) ?
          (props.view === "stacked" ? `
              color: ${props.hover_secondary_color || getColor(props.__globals__?.hover_secondary_color || "=white")};
              background-color: ${props.hover_primary_color || getColor(props.__globals__?.hover_primary_color || "=primary")};
          `
          :
          `
            border-color: ${props.hover_primary_color || getColor(props.__globals__?.hover_primary_color || "=primary")};
            color: ${props.hover_primary_color || getColor(props.__globals__?.hover_primary_color || "=primary")};
            background-color: ${props.hover_secondary_color || getColor(props.__globals__?.hover_secondary_color || "=white")};
          `
          ): `color: ${props.hover_primary_color || getColor(props.__globals__?.hover_primary_color || "=primary")};`}
      }
    `: ""
  }
`;

const AwesomeIcon = ({className, icon}) => (
  <FontAwesomeIcon {...{icon, className}}/>
)

const Icon = styled(AwesomeIcon)`
  font-size: ${(props) => props.size.size + "" + props.size.unit};
  width: ${(props) => props.size.size + "" + props.size.unit};
  height: ${(props) => props.size.size + "" + props.size.unit};
  ${props => ["framed", "stacked"].includes(props.view) ? `padding: ${props.icon_padding.size + "" + props.icon_padding.unit};` : ""}
  ${props => props.rotateDesktop ? `transform: rotate(${props.rotateDesktop}deg);` : ""}

  ${props => props.rotateMobile ? `
    @media ${device.mobile} {
      transform: rotate(${props.rotateMobile}deg);
    }
  ` : ""}

  ${props => props.rotateTablet ? `
    @media ${device.tablet} {
      transform: rotate(${props.rotateTablet}deg);
    }
  ` : ""}
`;

const LinkExternal = styled.a`
  color: inherit;
  text-decoration: none;
`;

const LinkInternal = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const IconElementor = (props) => {

  const [external, setExternal] = React.useState(false);
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
    rotate_tablet,
    rotate_mobile,
    primary_color,
    secondary_color,
    border_width,
    link,
    hover_animation,
    hover_primary_color,
    hover_secondary_color,
    view,
    shape,
    location,
    __globals__={primary_color: "=primary", secondary_color: "=white"},
    icon_padding = { size: 25, unit: "px" },
  } = props;
  console.log(props);

  React.useEffect(() => {
    const checkDomain = function (url) {
      if (url.indexOf("//") === 0) {
        url = location.protocol + url;
      }
      return url
        .toLowerCase()
        .replace(/([a-z])?:\/\//, "$1")
        .split("/")[0];
    };

    const isExternal = function (url) {
      return (
        (url.indexOf(":") > -1 || url.indexOf("//") > -1) &&
        checkDomain(location.href) !== checkDomain(url)
      );
    };

    if (isExternal(link?.url)) {
      setExternal(true);
    }
  }, [link, location]);

  const icon =
    <IconBorder
      {...{size, size_tablet, size_mobile, view, shape, secondary_color, primary_color, border_radius, border_width, __globals__, hover_animation, hover_primary_color, hover_secondary_color}}
    >
      <Icon
        {...{size, icon_padding, view, rotate, rotate_mobile, rotate_tablet, primary_color, secondary_color, __globals__ }}
        icon={getIcon(
          selected_icon?.library || "fa-regular",
          selected_icon?.value?.split(" ")[1] || "fa-star"
        )}
      />
    </IconBorder>;

  return (
    <IconContainer
      {...{align, align_mobile, align_tablet}}
    >
      {link?.url ? (
        external ? (
          <LinkExternal
            href={link.url}
            target={link.is_external === "on" ? "_blank" : "_self"}
            rel="noreferrer"
          >
            {icon}
          </LinkExternal>
        ) : (
          <LinkInternal to={link.url}>{icon}</LinkInternal>
        )
      ) : (
        icon
      )}
    </IconContainer>
  );
};

export default IconElementor;
