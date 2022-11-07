import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";
import { getIcon } from "../fontawesome/icons";
import { device } from "../mediaquery/size";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sizeStyle = {
    xs: ["13px", "10px 20px", "2px"],
    sm: ["15px", "12px 24px", "3px"],
    md: ["16px", "15px 30px", "4px"],
    lg: ["18px", "20px 40px", "5px"],
    xl: ["20px", "25px 50px", "6px"],
}

const IconContainer = styled.span`
    ${props => props.align === "left" ?
        `margin-right: ${props.size};`
        :
        `margin-left: ${props.size};`
    }
`;

const ButtonWrapper = styled.div`
    ${props => props.align ? `text-align: ${props.align}` : ""};
`

const ButtonStyled = styled.button`
    ${props =>`
        font-size: ${(props.typography_font_size && props.typography_typography === "custom" ? `${props.typography_font_size?.size}${props.typography_font_size?.unit}` : null) || props.sizes[0]};
        padding: ${props.sizes[1]};
        border-radius: ${props.sizes[2]};
    `}
    font-weight: 700;
    background: ${props => props.background_background === "gradient" ? (
        props.background_gradient_type === "radial" ?
            `radial-gradient(at center center, ${
                props.background_color
            } ${
                props.background_color_stop?.size || 0
            }${
                props.background_color_stop?.unit || "%"
            }, ${
                props.background_color_b
            } ${
                props.background_color_b_stop?.size || 100
            }${
                props.background_color_b_stop?.unit || "%"
            })`
            :
            `linear-gradient(${
                props.background_gradient_angle?.size
            }${
                props.background_gradient_angle?.unit
            }, ${
                props.background_color
            } ${
                props.background_color_stop?.size || 0
            }${
                props.background_color_stop?.unit || "%"
            }, ${
                props.background_color_b
            } ${
                props.background_color_b_stop?.size || 100
            }${
                props.background_color_b_stop?.unit || "%"
            })`) : props.background_color || props.color};
    border: none;
    color: ${props => props.button_text_color || "white"};
    font-family: ${props => (props.typography_font_family && props.typography_typography === "custom" ? `"${props.typography_font_family}", Sans-serif` : null) || "sans-serif"};
    cursor: pointer;
    ${props => props.text_shadow_text_shadow_type === "yes" ? `
        text-shadow: ${props.text_shadow_text_shadow.horizontal}px ${props.text_shadow_text_shadow.vertical}px ${props.text_shadow_text_shadow.blur}px ${props.text_shadow_text_shadow.color};
    ` : ""}
    ${props => props.typography_word_spacing && props.typography_typography === "custom" ? `
        word-spacing: ${props.typography_word_spacing.size}${props.typography_word_spacing.unit};
    ` : ""}

    ${props => props.typography_word_spacing_tablet && props.typography_typography === "custom" ? `
        @media ${device.tablet} {
            word-spacing: ${props.typography_word_spacing_tablet.size}${props.typography_word_spacing_tablet.unit};
        }
    ` : ""}

    ${props => props.typography_word_spacing_mobile && props.typography_typography === "custom" ? `
        @media ${device.mobile} {
            word-spacing: ${props.typography_word_spacing_mobile.size}${props.typography_word_spacing_mobile.unit};
        }
    ` : ""}

    ${props => props.typography_text_transform && props.typography_typography === "custom"? `
        text-transform: ${props.typography_text_transform};
    ` : ""}

    ${props => props.typography_line_height && props.typography_typography === "custom" ? `
        line-height: ${props.typography_line_height.size}${props.typography_line_height.unit};
    ` : ""}

    ${props => props.typography_line_height_tablet && props.typography_typography === "custom" ? `
        @media ${device.tablet} {
            line-height: ${props.typography_line_height_tablet.size}${props.typography_line_height_tablet.unit};
        }
    ` : ""}

    ${props => props.typography_line_height_mobile && props.typography_typography === "custom" ? `
        @media ${device.mobile} {
            line-height: ${props.typography_line_height_mobile.size}${props.typography_line_height_mobile.unit};
        }
    ` : ""}

    ${props => props.typography_letter_spacing && props.typography_typography === "custom" ? `
        letter-spacing: ${props.typography_letter_spacing.size}${props.typography_letter_spacing.unit};
    ` : ""}

    ${props => props.typography_letter_spacing_tablet && props.typography_typography === "custom" ? `
        @media ${device.tablet} {
            letter-spacing: ${props.typography_letter_spacing_tablet.size}${props.typography_letter_spacing_tablet.unit};
        }
    ` : ""}

    ${props => props.typography_letter_spacing_mobile && props.typography_typography === "custom" ? `
        @media ${device.mobile} {
            letter-spacing: ${props.typography_letter_spacing_mobile.size}${props.typography_letter_spacing_mobile.unit};
        }
    ` : ""}

    ${props => props.typography_font_style && props.typography_typography === "custom" ? `
        font-style: ${props.typography_font_style};
    ` : ""}

    ${props => props.typography_font_weight && props.typography_typography === "custom" ? `
        font-weight: ${props.typography_font_weight};
    ` : ""}

    ${props => props.typography_font_size_tablet && props.typography_typography === "custom" ? `
        @media ${device.tablet} {
            font-size: ${props.typography_font_size_tablet.size}${props.typography_font_size_tablet.unit};
        }
    ` : ""}

    ${props => props.typography_font_size_mobile && props.typography_typography === "custom" ? `
        @media ${device.mobile} {
            font-size: ${props.typography_font_size_mobile.size}${props.typography_font_size_mobile.unit};
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

const btnType = {
    default: "#61CE70",
    info: "#5bc0de",
    success: "#61CE70",
    warning: "#f0ad4e",
    danger: "#d9534f",

}

const Button = (props) => {
    const [external, setExternal] = React.useState(false);
    const {
        text,
        align,
        size="sm",
        link={url: ""},
        location,
        button_type="default",
        selected_icon,
        icon_indent,
        icon_align="left",
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
        border_radius,
        border_width,
        button_box_shadow_box_shadow,
        button_box_shadow_box_shadow_position,
        button_box_shadow_box_shadow_type,
        button_text_color,
        text_padding,
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
        typography_word_spacing_tablet
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

    const icon = <IconContainer size={icon_indent?.size+icon_indent?.unit} align={icon_align}>
        <FontAwesomeIcon icon={getIcon(selected_icon?.library || "fa-solid", selected_icon?.value?.split(" ")[1] || "fa-star")}/>
    </IconContainer>

    const btn =
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
                // background_background,
                // background_color,
                // background_color_b,
                // background_color_b_stop,
                // background_color_stop,
                // background_gradient_angle,
                // background_gradient_position,
            }}
        >
            {selected_icon?.value && icon_align === "left" && icon}
            <span>{text}</span>
            {selected_icon?.value && icon_align === "right" && icon}
        </ButtonStyled>;

    return (
        <ButtonWrapper align={align}>
            {
                link.url.length > 0 || link.is_external === "on" ?
                    (
                        external ?
                            <LinkExternal
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {btn}
                            </LinkExternal>
                        :
                            <LinkInternal
                                to={link.url}
                            >
                                {btn}
                            </LinkInternal>
                    )
                :
                    btn
            }
        </ButtonWrapper>
    )
}


export default Button;