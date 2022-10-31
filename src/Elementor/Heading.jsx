import React from "react";
import {Link} from "gatsby";
import styled from "styled-components";
import { device } from "../mediaquery/size";

const sizeHeader = {
  small: 15,
  medium: 19,
  large: 29,
  xl: 39,
  xxl: 59,
};

const Header = ({
  children,
  header_size,
  className
}) => React.createElement(header_size, {className}, children);

const HeaderStyle = styled(Header)`
${(props) =>
  props.size
    ? `
  font-size: ${props.sizeHeader[props.size]}px;
`
    : ""}
${(props) =>
  ((props.align && !props.align_tablet) || (props.align && !props.align_mobile)) ? `
    text-align: ${props.align};
  `: ""}

${(props) =>
  (props.align && props.align_mobile && props.align_tablet)
    ? `
  @media ${device.laptop} {
    text-align: ${props.align};
  }` : ""
}

${(props) => 
  props.align_tablet ? `
  @media ${device.tablet} {
    text-align: ${props.align_tablet || props.align};
  }`: ""
}

${(props) =>
  props.align_mobile ? `
  @media ${device.mobile} {
    text-align: ${props.align_mobile || props.align};
  }` : ""
}
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
    link={url:""},
    location
  } = props;

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
    console.log(link?.url);
    console.log(isExternal(link?.url));

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
        sizeHeader
      }}
    >
      {
        link?.url ? (
          external ?
            <LinkExternal
              href={link.url}
              target={link.is_external === "on" ? "_blank" : "_self"}
              rel="noreferrer"
            >
              {title}
            </LinkExternal>
          :
            <LinkInternal to={link.url}>{title}</LinkInternal>
        )
        :
        title
      }
    </HeaderStyle>
  );
}
export default Heading;
