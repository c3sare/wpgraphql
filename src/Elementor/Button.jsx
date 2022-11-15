import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { getIcon } from "../fontawesome/icons";
import { device } from "../mediaquery/size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as animation from "../css/keyframes.module.css";

const ButtonHoverAnimation = (props) => {
  console.log(props);
  const normalized = props.hover_animation
    ? "elementorAnimation" +
      props.hover_animation[0].toUpperCase() +
      props.hover_animation.slice(1)
    : "";
  const className = `${props.className}${
    props.hover_animation ? ` ${animation[normalized]}` : ""
  }`;

  return <button className={className}>{props.children}</button>;
};

function getBackground(
  background_background,
  background_gradient_type,
  background_gradient_angle,
  background_color,
  background_color_stop,
  background_color_b,
  background_color_b_stop,
  background_gradient_position,
  color
) {
  const linear = `linear-gradient(${background_gradient_angle?.size}${
    background_gradient_angle?.unit
  }, ${background_color} ${background_color_stop?.size || 0}${
    background_color_stop?.unit || "%"
  }, ${background_color_b} ${background_color_b_stop?.size || 100}${
    background_color_b_stop?.unit || "%"
  })`;

  const radial = `radial-gradient(at ${
    background_gradient_position || "center center"
  }, ${background_color} ${background_color_stop?.size || 0}${
    background_color_stop?.unit || "%"
  }, ${background_color_b} ${background_color_b_stop?.size || 100}${
    background_color_b_stop?.unit || "%"
  })`;

  return background_background === "gradient"
    ? background_gradient_type === "radial"
      ? radial
      : linear
    : background_color || color;
}

const sizeStyle = {
  xs: ["13px", "10px 20px", "2px"],
  sm: ["15px", "12px 24px", "3px"],
  md: ["16px", "15px 30px", "4px"],
  lg: ["18px", "20px 40px", "5px"],
  xl: ["20px", "25px 50px", "6px"],
};

const IconContainer = styled.span`
  ${(props) =>
    props.align === "left"
      ? `margin-right: ${props.size};`
      : `margin-left: ${props.size};`}
`;

const ButtonWrapper = styled.div`
  margin-bottom: 20px;
  ${(props) => (props.align ? `text-align: ${props.align}` : "")};
`;

const ButtonStyled = styled(ButtonHoverAnimation)`
  ${(props) => {
    const {
      typography_font_size,
      typography_typography,
      text_padding,
      text_padding_tablet,
      text_padding_mobile,
      sizes,
      background_background,
      background_gradient_type,
      background_gradient_position,
      background_color,
      background_color_stop,
      background_color_b,
      background_color_b_stop,
      background_gradient_angle,
      color,
      button_text_color,
      typography_font_family,
      typography_font_weight,
      border_radius,
      border_border,
      border_color,
      text_shadow_text_shadow_type,
      text_shadow_text_shadow,
      typography_word_spacing,
      typography_text_transform,
      typography_line_height,
      typography_letter_spacing,
      typography_font_style,
      border_width,
      border_width_tablet,
      border_width_mobile,
      button_box_shadow_box_shadow,
      button_box_shadow_box_shadow_type,
      button_box_shadow_box_shadow_position,
      typography_word_spacing_tablet,
      typography_line_height_tablet,
      typography_letter_spacing_tablet,
      typography_font_size_tablet,
      typography_word_spacing_mobile,
      typography_line_height_mobile,
      typography_letter_spacing_mobile,
      typography_font_size_mobile,
      button_background_hover_background,
      button_background_hover_color,
      button_background_hover_color_b,
      button_background_hover_color_stop,
      button_background_hover_color_b_stop,
      button_background_hover_gradient_position,
      button_background_hover_gradient_angle,
      button_background_hover_gradient_type,
      button_hover_border_color,
      hover_color,
    } = props;

    const fontSize =
      (typography_font_size && typography_typography === "custom"
        ? `${typography_font_size?.size}${typography_font_size?.unit}`
        : null) || sizes[0];

    const buttonPadding = text_padding
      ? `${text_padding.top}${text_padding.unit} ${text_padding.right}${text_padding.unit} ${text_padding.bottom}${text_padding.unit} ${text_padding.left}${text_padding.unit}`
      : sizes[1];

    const fontFamily =
      (typography_font_family && typography_typography === "custom"
        ? `"${typography_font_family}", Sans-serif`
        : null) || "sans-serif";

    const fontWeight =
      typography_font_weight && typography_typography === "custom"
        ? typography_font_weight
        : 600;

    const borderRadius = `${border_radius?.top + border_radius?.unit} ${
      border_radius?.right + border_radius?.unit
    } ${border_radius?.bottom + border_radius?.unit} ${
      border_radius?.left + border_radius?.unit
    }`;

    const tshadowType = text_shadow_text_shadow_type;
    const tshadow = text_shadow_text_shadow;

    const custom = typography_typography === "custom";

    return `
            cursor: pointer;
            color: ${button_text_color || "white"};
            font-size: ${fontSize};
            padding: ${buttonPadding};
            border-radius: ${border_radius ? borderRadius : sizes[2]};
            background: ${getBackground(
              background_background,
              background_gradient_type,
              background_gradient_angle,
              background_color,
              background_color_stop,
              background_color_b,
              background_color_b_stop,
              background_gradient_position,
              color
            )};
            font-family: ${fontFamily};
            font-weight: ${fontWeight};
            border: ${
              border_border
                ? `3px ${border_border} ${border_color || "black"}`
                : "none"
            };
            transition: border-color 0.4s, color 0.4s, background 0.4s;
            ${
              tshadowType === "yes"
                ? `text-shadow: ${tshadow.horizontal}px ${tshadow.vertical}px ${tshadow.blur}px ${tshadow.color};`
                : ""
            }
            ${
              typography_word_spacing && custom
                ? `
                    word-spacing: ${typography_word_spacing.size}${typography_word_spacing.unit};
                `
                : ""
            }
            ${
              typography_text_transform && custom
                ? `
                    text-transform: ${typography_text_transform};
                `
                : ""
            }
            ${
              typography_line_height && custom
                ? `
                    line-height: ${typography_line_height.size}${typography_line_height.unit};
                `
                : ""
            }
            ${
              typography_letter_spacing && custom
                ? `
                    letter-spacing: ${typography_letter_spacing.size}${typography_letter_spacing.unit};
                `
                : ""
            }
            ${
              typography_font_style && custom
                ? `
                    font-style: ${typography_font_style};
                `
                : ""
            }
            ${
              border_border && border_width
                ? `
                    border-width: ${border_width.top + border_width.unit} ${
                    border_width.right + border_width.unit
                  } ${border_width.bottom + border_width.unit} ${
                    border_width.left + border_width.unit
                  };
                `
                : ""
            }
        
            ${
              button_box_shadow_box_shadow_type === "yes"
                ? `
                    box-shadow: ${button_box_shadow_box_shadow.horizontal}px ${
                    button_box_shadow_box_shadow.vertical
                  }px ${button_box_shadow_box_shadow.blur}px ${
                    button_box_shadow_box_shadow.spread
                  }px ${button_box_shadow_box_shadow.color} ${
                    button_box_shadow_box_shadow_position || ""
                  };
                `
                : ""
            }

            &:hover {
                ${
                  button_hover_border_color
                    ? `border-color: ${button_hover_border_color};`
                    : ""
                }
                ${hover_color ? `color: ${hover_color};` : ""}
                ${
                  button_background_hover_background ||
                  button_background_hover_gradient_type ||
                  button_background_hover_gradient_angle ||
                  button_background_hover_color ||
                  button_background_hover_color_stop ||
                  button_background_hover_color_b ||
                  button_background_hover_color_b_stop ||
                  button_background_hover_gradient_position ||
                  hover_color
                    ? `
                    background: ${getBackground(
                      button_background_hover_background,
                      button_background_hover_gradient_type,
                      button_background_hover_gradient_angle,
                      button_background_hover_color,
                      button_background_hover_color_stop,
                      button_background_hover_color_b,
                      button_background_hover_color_b_stop,
                      button_background_hover_gradient_position,
                      hover_color
                    )};
                `
                    : ""
                }
            }

            @media ${device.tablet} {
                ${
                  typography_word_spacing_tablet && custom
                    ? `
                        word-spacing: ${typography_word_spacing_tablet.size}${typography_word_spacing_tablet.unit};
                    `
                    : ""
                }
                ${
                  typography_line_height_tablet && custom
                    ? `
                        line-height: ${typography_line_height_tablet.size}${typography_line_height_tablet.unit};
                    `
                    : ""
                }
                ${
                  typography_letter_spacing_tablet && custom
                    ? `
                        letter-spacing: ${typography_letter_spacing_tablet.size}${typography_letter_spacing_tablet.unit};
                    `
                    : ""
                }
                ${
                  typography_font_size_tablet && custom
                    ? `
                        font-size: ${typography_font_size_tablet.size}${typography_font_size_tablet.unit};
                    `
                    : ""
                }
                ${
                  text_padding_tablet && custom
                    ? `
                        padding: ${
                          text_padding_tablet.top + text_padding_tablet.unit
                        } ${
                        text_padding_tablet.right + text_padding_tablet.unit
                      } ${
                        text_padding_tablet.bottom + text_padding_tablet.unit
                      } ${text_padding_tablet.left + text_padding_tablet.unit};
                    `
                    : ""
                }
                ${
                  border_border && border_width_tablet
                    ? `
                        border-width: ${
                          border_width_tablet.top + border_width_tablet.unit
                        } ${
                        border_width_tablet.right + border_width_tablet.unit
                      } ${
                        border_width_tablet.bottom + border_width_tablet.unit
                      } ${border_width_tablet.left + border_width_tablet.unit};
                    `
                    : ""
                }
            }

            @media ${device.mobile} {
                ${
                  typography_word_spacing_mobile && custom
                    ? `
                        word-spacing: ${typography_word_spacing_mobile.size}${typography_word_spacing_mobile.unit};
                    `
                    : ""
                }
                
                ${
                  typography_line_height_mobile && custom
                    ? `
                        line-height: ${typography_line_height_mobile.size}${typography_line_height_mobile.unit};
                    `
                    : ""
                }
                
                ${
                  typography_letter_spacing_mobile && custom
                    ? `
                        letter-spacing: ${typography_letter_spacing_mobile.size}${typography_letter_spacing_mobile.unit};
                    `
                    : ""
                }
                
                ${
                  typography_font_size_mobile && custom
                    ? `
                        font-size: ${typography_font_size_mobile.size}${typography_font_size_mobile.unit};
                    `
                    : ""
                }
                ${
                  text_padding_mobile && custom
                    ? `
                        padding: ${
                          text_padding_mobile.top + text_padding_mobile.unit
                        } ${
                        text_padding_mobile.right + text_padding_mobile.unit
                      } ${
                        text_padding_mobile.bottom + text_padding_mobile.unit
                      } ${text_padding_mobile.left + text_padding_mobile.unit};
                    `
                    : ""
                }
                ${
                  border_border && border_width_mobile
                    ? `
                        border-width: ${
                          border_width_mobile.top + border_width_mobile.unit
                        } ${
                        border_width_mobile.right + border_width_mobile.unit
                      } ${
                        border_width_mobile.bottom + border_width_mobile.unit
                      } ${border_width_mobile.left + border_width_mobile.unit};
                    `
                    : ""
                }
            }
        `;
  }}
`;

const LinkExternal = styled.a`
  color: inherit;
  text-decoration: none;
`;

const LinkInternal = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const btnType = {
  default: "#61CE70",
  info: "#5bc0de",
  success: "#61CE70",
  warning: "#f0ad4e",
  danger: "#d9534f",
};

const Button = (props) => {
  const [external, setExternal] = React.useState(false);
  const {
    text,
    align,
    size = "sm",
    link = { url: "" },
    location,
    button_type = "default",
    selected_icon,
    icon_indent,
    icon_align = "left",
    background_background,
    background_color,
    background_color_b,
    background_color_b_stop,
    background_color_stop,
    background_gradient_angle,
    background_gradient_position,
    background_gradient_type,
    border_border,
    border_color,
    border_width,
    border_width_tablet,
    border_width_mobile,
    border_radius,
    button_box_shadow_box_shadow,
    button_box_shadow_box_shadow_position,
    button_box_shadow_box_shadow_type,
    button_text_color,
    text_padding,
    text_padding_tablet,
    text_padding_mobile,
    text_shadow_text_shadow,
    text_shadow_text_shadow_type,
    typography_typography,
    typography_font_family,
    typography_font_size,
    typography_font_size_mobile,
    typography_font_size_tablet,
    typography_font_style,
    typography_font_weight,
    typography_letter_spacing,
    typography_letter_spacing_mobile,
    typography_letter_spacing_tablet,
    typography_line_height,
    typography_line_height_mobile,
    typography_line_height_tablet,
    typography_text_transform,
    typography_word_spacing,
    typography_word_spacing_mobile,
    typography_word_spacing_tablet,
    button_background_hover_background,
    button_background_hover_color,
    button_background_hover_color_b,
    button_background_hover_color_stop,
    button_background_hover_color_b_stop,
    button_background_hover_gradient_position,
    button_background_hover_gradient_angle,
    button_background_hover_gradient_type,
    button_hover_border_color,
    hover_color,
    hover_animation,
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

  const icon = (
    <IconContainer
      size={icon_indent?.size + icon_indent?.unit}
      align={icon_align}
    >
      <FontAwesomeIcon
        icon={getIcon(
          selected_icon?.library || "fa-solid",
          selected_icon?.value?.split(" ")[1] || "fa-star"
        )}
      />
    </IconContainer>
  );

  const btn = (
    <ButtonStyled
      {...{
        color: btnType[button_type],
        sizes: sizeStyle[size],
        typography_typography,
        typography_font_family,
        typography_font_size,
        typography_font_size_mobile,
        typography_font_size_tablet,
        typography_font_style,
        typography_font_weight,
        typography_letter_spacing,
        typography_letter_spacing_mobile,
        typography_letter_spacing_tablet,
        typography_line_height,
        typography_line_height_mobile,
        typography_line_height_tablet,
        typography_text_transform,
        typography_word_spacing,
        typography_word_spacing_mobile,
        typography_word_spacing_tablet,
        text_shadow_text_shadow,
        text_shadow_text_shadow_type,
        button_text_color,
        background_background,
        background_color,
        background_color_stop,
        background_color_b,
        background_color_b_stop,
        background_gradient_angle,
        background_gradient_type,
        background_gradient_position,
        border_radius,
        text_padding,
        text_padding_tablet,
        text_padding_mobile,
        border_border,
        border_color,
        border_width,
        border_width_tablet,
        border_width_mobile,
        button_box_shadow_box_shadow,
        button_box_shadow_box_shadow_position,
        button_box_shadow_box_shadow_type,
        button_background_hover_background,
        button_background_hover_color,
        button_background_hover_color_b,
        button_background_hover_color_stop,
        button_background_hover_color_b_stop,
        button_background_hover_gradient_position,
        button_background_hover_gradient_angle,
        button_background_hover_gradient_type,
        button_hover_border_color,
        hover_color,
        hover_animation,
      }}
    >
      {selected_icon?.value && icon_align === "left" && icon}
      <span>{text}</span>
      {selected_icon?.value && icon_align === "right" && icon}
    </ButtonStyled>
  );

  return (
    <ButtonWrapper align={align}>
      {link.url.length > 0 || link.is_external === "on" ? (
        external ? (
          <LinkExternal href={link.url} target="_blank" rel="noreferrer">
            {btn}
          </LinkExternal>
        ) : (
          <LinkInternal to={link.url}>{btn}</LinkInternal>
        )
      ) : (
        btn
      )}
    </ButtonWrapper>
  );
};

export default Button;
