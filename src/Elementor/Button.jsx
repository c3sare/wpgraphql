import React from "react";
import styled from "styled-components";
import {Link} from "gatsby";
import { getIcon } from "../fontawesome/icons";
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
        font-size: ${props.sizes[0]};
        padding: ${props.sizes[1]};
        border-radius: ${props.sizes[2]};
    `}
    font-weight: 700;
    background-color: ${props => props.color};
    border: none;
    color: white;
    font-family: sans-serif;
    cursor: pointer;
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
    const {text, align, size="sm", link={url: ""}, location, button_type="default", selected_icon, icon_indent, icon_align="left"} = props;
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

    const icon = <IconContainer size={icon_indent.size+icon_indent.unit} align={icon_align}>
        <FontAwesomeIcon icon={getIcon(selected_icon.library, selected_icon.value.split(" ")[1])}/>
    </IconContainer>

    const btn =
        <ButtonStyled
            color={btnType[button_type]}
            sizes={sizeStyle[size]}
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