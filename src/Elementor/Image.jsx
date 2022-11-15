import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { LightBox } from "../components/layout";
import styled from "styled-components";
import { device } from "../mediaquery/size";
import * as animation from "../css/keyframes.module.css";

const alignFlex = {
  left: "start",
  center: "center",
  right: "end",
};

const CustomContainer = (props) => {
  const animationName = props.hover_animation;
  const capitalized = props.hover_animation ? props.hover_animation[0].toUpperCase()+props.hover_animation.slice(1) : null;
  const fullAnimationName = "elementorAnimation"+capitalized;

  const newClassName =
    (animationName ? `${animation[fullAnimationName]} ` : "")+props.className;

  return (
    <div className={newClassName}>
      {props.children}
    </div>
  );
};

const Container = styled(CustomContainer)`
  display: flex;
  flex-direction: column;
  ${props => props.background_hover_transition ? `
    transition: filter ${props.background_hover_transition.size}s;
    transition-duration: ${props.background_hover_transition.size}s !important;
  ` : ""}
  ${props => (!props.align_mobile || !props.align_tablet) ? `
    text-align: ${props.align};
    align-items: ${props.alignFlex[props.align]};
  ` : ""}

  ${props => (props.align_mobile && props.align_tablet) ? `@media ${device.laptop} {
    text-align: ${props.align};
    align-items: ${props.alignFlex[props.align]};
  }` : ""}

  ${props => props.align_tablet ? `@media ${device.tablet} {
    text-align: ${props.align_tablet || props.align};
    align-items: ${props.alignFlex[props.align_tablet || props.align]};
  }` : ""}

  ${props => props.align_mobile ? `@media ${device.mobile} {
    text-align: ${props.align_mobile || props.align};
    align-items: ${props.alignFlex[props.align_mobile || props.align]};
  }` : ""}
  ${(props) => {
    const {
      css_filters_blur,
      css_filters_brightness,
      css_filters_contrast,
      css_filters_css_filter,
      css_filters_hue,
      css_filters_saturate,
    } = props;
    if (css_filters_css_filter !== "custom") return "";
    const tab = [];
    if (css_filters_blur) tab.push(`blur(${css_filters_blur?.size}px)`);
    if (css_filters_brightness)
      tab.push(`brightness(${css_filters_brightness?.size}%)`);
    if (css_filters_contrast)
      tab.push(`contrast(${css_filters_contrast?.size}%)`);
    if (css_filters_saturate)
      tab.push(`saturate(${css_filters_saturate?.size}%)`);
    if (css_filters_hue) tab.push(`hue-rotate(${css_filters_hue?.size}deg)`);

    if (tab.length > 0) return `filter: ${tab.join(" ")};`;
    else return "";
  }}
  ${(props) => {
    const {
      css_filters_hover_blur,
      css_filters_hover_brightness,
      css_filters_hover_contrast,
      css_filters_hover_css_filter,
      css_filters_hover_hue,
      css_filters_hover_saturate,
    } = props;
    if (css_filters_hover_css_filter !== "custom") return "";
    const tab = [];
    if (css_filters_hover_blur) tab.push(`blur(${css_filters_hover_blur?.size}px)`);
    if (css_filters_hover_brightness)
      tab.push(`brightness(${css_filters_hover_brightness?.size}%)`);
    if (css_filters_hover_contrast)
      tab.push(`contrast(${css_filters_hover_contrast?.size}%)`);
    if (css_filters_hover_saturate)
      tab.push(`saturate(${css_filters_hover_saturate?.size}%)`);
    if (css_filters_hover_hue) tab.push(`hue-rotate(${css_filters_hover_hue?.size}deg)`);

    if (tab.length > 0) return `
      &:hover {
        filter: ${tab.join(" ")};
      }
    `;
    else return "";
  }}
`;

const Caption = styled.span`
  color: grey;
`;

const CustomGatsbyImage = (props) => {
  return (
    <GatsbyImage objectFit={""} style={{overflow: "inherit"}} image={props.image} alt={props.alt} className={props.className}/>
  )
}

const GatsbyImageStyled = styled(CustomGatsbyImage)`
  ${props => `
    ${props.height ? `
        height: ${props.height.size}${props.height.unit};
    ` : ""}
    ${props.width ? `
      width: ${props.width.size}${props.width.unit};
    ` : ""}
    ${props.space ? `
      max-width: ${props.space.size}${props.space.unit};
    ` : ""}
    & img {
      object-fit: ${props.object_fit || "cover"};
      ${props.image_border_border ? `
        border: 3px ${props.image_border_border} ${props.image_border_color || "black"};
      ` : ""}
      ${props.image_border_width ? `
        border-width: ${props.image_border_width.top}${props.image_border_width.unit} ${props.image_border_width.right}${props.image_border_width.unit} ${props.image_border_width.bottom}${props.image_border_width.unit} ${props.image_border_width.left}${props.image_border_width.unit};
      ` : ""}
      ${props.image_border_radius ? `
        border-radius: ${props.image_border_radius.top}${props.image_border_radius.unit} ${props.image_border_radius.right}${props.image_border_radius.unit} ${props.image_border_radius.bottom}${props.image_border_radius.unit} ${props.image_border_radius.left}${props.image_border_radius.unit};
      ` : ""}
      ${props.image_box_shadow_box_shadow_type === "yes" ? `
        box-shadow: ${props.image_box_shadow_box_shadow.horizontal}px ${props.image_box_shadow_box_shadow.vertical}px ${props.image_box_shadow_box_shadow.blur}px ${props.image_box_shadow_box_shadow.color};
      ` : ""}
    }

    @media ${device.mobile} {
      ${props.height_mobile ? `
        height: ${props.height_mobile.size}${props.height_mobile.unit};
      ` : ""}
      ${props.width_mobile ? `
        width: ${props.width_mobile.size}${props.width_mobile.unit};
      ` : ""}
      ${props.space_mobile ? `
        max-width: ${props.space_mobile.size}${props.space_mobile.unit};
    ` : ""}
        & img {
          ${props.object_fit_mobile ? `
            object-fit: ${props.object_fit_mobile};
          ` : ""}
          ${props.image_border_radius_mobile ? `
          border-radius: ${props.image_border_radius_mobile.top}${props.image_border_radius_mobile.unit} ${props.image_border_radius_mobile.right}${props.image_border_radius_mobile.unit} ${props.image_border_radius_mobile.bottom}${props.image_border_radius_mobile.unit} ${props.image_border_radius_mobile.left}${props.image_border_radius_mobile.unit};
        ` : ""}
        }
    }

    @media ${device.tablet} {
      ${props.height_tablet ? `
        height: ${props.height_tablet.size}${props.height_tablet.unit};
      ` : ""}
      ${props.width_tablet ? `
        width: ${props.width_tablet.size}${props.width_tablet.unit};
      ` : ""}
      ${props.space_tablet ? `
        max-width: ${props.space_tablet.size}${props.space_tablet.unit};
    ` : ""}
        & img {
          ${props.object_fit_tablet ? `
            object-fit: ${props.object_fit_tablet};
          ` : ""}
          ${props.image_border_radius_tablet ? `
            border-radius: ${props.image_border_radius_tablet.top}${props.image_border_radius_tablet.unit} ${props.image_border_radius_tablet.right}${props.image_border_radius_tablet.unit} ${props.image_border_radius_tablet.bottom}${props.image_border_radius_tablet.unit} ${props.image_border_radius_tablet.left}${props.image_border_radius_tablet.unit};
        ` : ""}
        }
    }
  `}
`;

const Image = (props) => {
  const [external, setExternal] = React.useState(false);
  const {
    image,
    align = "center",
    align_mobile,
    align_tablet,
    caption = "",
    caption_source = "",
    link_to = "",
    link = { url: "" },
    open_lightbox = "yes",
    location,
    height,
    height_mobile,
    height_tablet,
    space,
    space_mobile,
    space_tablet,
    width,
    width_mobile,
    width_tablet,
    background_hover_transition,
    css_filters_blur,
    css_filters_brightness,
    css_filters_contrast,
    css_filters_css_filter,
    css_filters_hover_blur,
    css_filters_hover_brightness,
    css_filters_hover_contrast,
    css_filters_hover_css_filter,
    css_filters_hover_hue,
    css_filters_hover_saturate,
    css_filters_hue,
    css_filters_saturate,
    opacity,
    opacity_hover,
    hover_animation,
    image_border_border,
    image_border_color,
    image_border_radius,
    image_border_radius_mobile,
    image_border_radius_tablet,
    image_border_width,
    image_box_shadow_box_shadow,
    image_box_shadow_box_shadow_type
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

  const dispatch = React.useContext(LightBox)[1];
  const Img = <GatsbyImageStyled
    image={image.data}
    alt={image.alt}
    {...{
      height,
      height_tablet,
      height_mobile,
      width, width_tablet,
      width_mobile, space,
      space_tablet,
      space_mobile,
      object_fit: props["object-fit"],
      object_fit_mobile: props["object-fit_mobile"],
      object_fit_tablet: props["object-fit_tablet"],
      image_border_border,
      image_border_color,
      image_border_radius,
      image_border_radius_mobile,
      image_border_radius_tablet,
      image_border_width,
      image_box_shadow_box_shadow,
      image_box_shadow_box_shadow_type,
    }}
  />;

  const externalOrImage = (
    <a
      rel="noreferrer"
      target={open_lightbox === "no" ? "_blank" : "_self"}
      onClick={(e) => {
        if (link_to === "file" && open_lightbox === "yes") {
          e.preventDefault();
          dispatch({
            type: "open",
            payload: [e.currentTarget.getAttribute("href")],
          });
        }
      }}
      href={link_to === "file" ? image.fullSizeUrl : link?.url}
    >
      {Img}
    </a>
  );

  const notExternal = <Link to={link?.url}>{Img}</Link>;

  return (
    <Container
      {...{
        align,
        alignFlex,
        align_tablet,
        align_mobile,
        background_hover_transition,
        css_filters_blur,
        css_filters_brightness,
        css_filters_contrast,
        css_filters_css_filter,
        css_filters_hover_blur,
        css_filters_hover_brightness,
        css_filters_hover_contrast,
        css_filters_hover_css_filter,
        css_filters_hover_hue,
        css_filters_hover_saturate,
        css_filters_hue,
        css_filters_saturate,
        opacity,
        opacity_hover,
        hover_animation
      }}>
      {link_to === "custom" || link_to === "file" ? (
        external || link_to === "file" ? (
          externalOrImage
        ) : (
          notExternal
        )
      ) : (
        <div>{Img}</div>
      )}
      {caption_source === "custom" && <Caption>{caption}</Caption>}
    </Container>
  );
};

export default Image;
