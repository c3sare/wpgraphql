import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { device } from "../mediaquery/size";

const sizeHeader = {
  small: 15,
  medium: 19,
  large: 29,
  xl: 39,
  xxl: 59,
};

export const getColor = (title_color) => {
  const color = title_color?.slice(title_color?.indexOf("=") + 1);

  const colors = {
    primary: "#6EC1E4",
    secondary: "#54595F",
    text: "#7A7A7A",
    accent: "#61CE70",
    white: "#FFFFFF",
  };
  return colors[color] || colors["primary"];
};

const Header = ({ children, header_size, className }) =>
  React.createElement(header_size, { className }, children);

const HeaderStyle = styled(Header)`
  ${(props) =>
    props.typography_typography === "custom"
      ? `
    ${
      props.typography_font_size
        ? `
        font-size: ${props.typography_font_size.size}${props.typography_font_size.unit};
    `
        : ""
    }

    ${
      props.typography_font_size_tablet
        ? `
        @media ${device.tablet} {
          font-size: ${props.typography_font_size_tablet.size}${props.typography_font_size_tablet.unit};
        }
    `
        : ""
    }

    ${
      props.typography_font_size_mobile
        ? `
        @media ${device.mobile} {
          font-size: ${props.typography_font_size_mobile.size}${props.typography_font_size_mobile.unit};
        }
    `
        : ""
    }

    ${
      props.typography_font_weight
        ? `
        font-weight: ${props.typography_font_weight || 400};
    `
        : ""
    }

    ${
      props.size
        ? `
    font-size: ${props.sizeHeader[props.size]}px;
  `
        : ""
    }

      ${
        props.typography_letter_spacing
          ? `
        letter-spacing: ${props.typography_letter_spacing.size}${props.typography_letter_spacing.unit};
      `
          : ""
      }

      ${
        props.typography_letter_spacing_tablet
          ? `
          @media ${device.tablet} {
            letter-spacing: ${props.typography_letter_spacing_tablet.size}${props.typography_letter_spacing_tablet.unit};
          }
      `
          : ""
      }

      ${
        props.typography_letter_spacing_mobile
          ? `
            @media ${device.mobile} {
              letter-spacing: ${props.typography_letter_spacing_mobile.size}${props.typography_letter_spacing_mobile.unit};
            }
          `
          : ""
      }

    ${
      props.typography_line_height
        ? `
        line-height: ${props.typography_line_height.size}${props.typography_line_height.unit};
    `
        : ""
    }

    ${
      props.typography_line_height_tablet
        ? `
        @media ${device.tablet} {
          line-height: ${props.typography_line_height_tablet.size}${props.typography_line_height_tablet.unit};
        }
    `
        : ""
    }

    ${
      props.typography_line_height_mobile
        ? `
        @media ${device.mobile} {
          line-height: ${props.typography_line_height_mobile.size}${props.typography_line_height_mobile.unit};
        }
    `
        : ""
    }

    ${
      props.typography_word_spacing
        ? `
        word-spacing: ${props.typography_word_spacing.size}${props.typography_word_spacing.unit};
    `
        : ""
    }

    ${
      props.typography_word_spacing_tablet
        ? `
        @media ${device.tablet} {
          word-spacing: ${props.typography_word_spacing_tablet.size}${props.typography_word_spacing_tablet.unit};
        }
    `
        : ""
    }

    ${
      props.typography_word_spacing_mobile
        ? `
        @media ${device.mobile} {
          word-spacing: ${props.typography_word_spacing_mobile.size}${props.typography_word_spacing_mobile.unit};
        }
    `
        : ""
    }

    ${
      props.typography_text_decoration
        ? `
      text-decoration: ${props.typography_text_decoration};
    `
        : ""
    }

    ${
      props.typography_text_transform
        ? `
      text-transform: ${props.typography_text_transform};
    `
        : ""
    }

    ${
      props.typography_font_style
        ? `
      font-style: ${props.typography_font_style};
    `
        : ""
    }
  `
      : ""}

  ${(props) => `
    color: ${props.title_color || getColor(props?.__globals__?.title_color)};
  `}

  ${(props) =>
    props.text_shadow_text_shadow_type === "yes"
      ? `
        text-shadow: ${props.text_shadow_text_shadow.horizontal || 0}px ${
          props.text_shadow_text_shadow.vertical || 0
        }px ${props.text_shadow_text_shadow.blur || 0}px ${
          props.text_shadow_text_shadow.color || "#000000"
        };
      `
      : ""}

    ${(props) =>
    props.text_stroke_text_stroke_type === "yes"
      ? `
        -webkit-text-stroke-width: ${props.text_stroke_text_stroke.size || 0}${
          props.text_stroke_text_stroke.unit || "px"
        };
        stroke-width: ${props.text_stroke_text_stroke.size || 0}${
          props.text_stroke_text_stroke.unit || "px"
        };
        -webkit-text-stroke-color: ${
          props?.__globals__?.text_stroke_stroke_color
            ? getColor(props.__globals__.text_stroke_stroke_color)
            : props.text_stroke_stroke_color || getColor("primary")
        };
        stroke: ${
          props?.__globals__?.text_stroke_stroke_color
            ? getColor(props.__globals__.text_stroke_stroke_color)
            : props.text_stroke_stroke_color || getColor("primary")
        };
        `
      : ""}

  ${(props) =>
    (props.align && !props.align_tablet) || (props.align && !props.align_mobile)
      ? `
    text-align: ${props.align};
  `
      : ""}

${(props) =>
    props.align && props.align_mobile && props.align_tablet
      ? `
  @media ${device.laptop} {
    text-align: ${props.align};
  }`
      : ""}

${(props) =>
    props.align_tablet
      ? `
  @media ${device.tablet} {
    text-align: ${props.align_tablet || props.align};
  }`
      : ""}

${(props) =>
    props.align_mobile
      ? `
  @media ${device.mobile} {
    text-align: ${props.align_mobile || props.align};
  }`
      : ""}
`;

const LinkExternal = styled.a`
  color: inherit;
  text-decoration: none;
`;

const LinkInternal = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Heading = (props) => {
  const [external, setExternal] = React.useState(false);
  const {
    align,
    align_mobile,
    align_tablet,
    title,
    header_size = "h2",
    size,
    link = { url: "" },
    location,
    title_color,
    text_shadow_text_shadow,
    text_shadow_text_shadow_type = "no",
    text_stroke_stroke_color,
    text_stroke_text_stroke,
    text_stroke_text_stroke_type = "no",
    typography_font_size,
    typography_font_size_tablet,
    typography_font_size_mobile,
    typography_font_weight,
    typography_letter_spacing,
    typography_letter_spacing_tablet,
    typography_letter_spacing_mobile,
    typography_line_height,
    typography_line_height_tablet,
    typography_line_height_mobile,
    typography_text_decoration,
    typography_text_transform,
    typography_typography,
    typography_word_spacing,
    typography_word_spacing_tablet,
    typography_word_spacing_mobile,
    __globals__,
    typography_font_style,
    // typography_font_family,
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

  return (
    <HeaderStyle
      {...{
        align,
        align_mobile,
        align_tablet,
        title,
        header_size,
        size,
        sizeHeader,
        title_color,
        text_shadow_text_shadow,
        text_shadow_text_shadow_type,
        text_stroke_stroke_color,
        text_stroke_text_stroke,
        text_stroke_text_stroke_type,
        typography_font_size,
        typography_font_size_tablet,
        typography_font_size_mobile,
        typography_font_weight,
        typography_letter_spacing,
        typography_letter_spacing_tablet,
        typography_letter_spacing_mobile,
        typography_line_height,
        typography_line_height_tablet,
        typography_line_height_mobile,
        typography_text_decoration,
        typography_text_transform,
        typography_typography,
        typography_word_spacing,
        typography_word_spacing_tablet,
        typography_word_spacing_mobile,
        __globals__,
        typography_font_style,
        // typography_font_family,
      }}
    >
      {link?.url ? (
        external ? (
          <LinkExternal
            href={link.url}
            target={link.is_external === "on" ? "_blank" : "_self"}
            rel="noreferrer"
          >
            {title}
          </LinkExternal>
        ) : (
          <LinkInternal to={link.url}>{title}</LinkInternal>
        )
      ) : (
        title
      )}
    </HeaderStyle>
  );
};
export default Heading;
