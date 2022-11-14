import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import CloseIcon from "../images/close.svg";
import ReactPlayer from "react-player";
import ReactPlayerLazy from "react-player/lazy";
import { getIcon } from "../fontawesome/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { device } from "../mediaquery/size";

const aspectRatio = {
  11: "100%",
  32: "66.6666%",
  43: "75%",
  169: "56.25%",
  219: "42.8571%",
  916: "177.8%",
};

const stylePlayer = `
  max-width: 100%;
  width: 100%;
  margin: 0;
  line-height: 1;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border: 0;
  background-color: #000;
`;

const StyledAnimatedLightbox = React.forwardRef((props, ref) => {
  const animationName = props.lightbox_content_animation || "fadeIn";

  const newClassName =
    props.className + (animationName ? ` animated ${animationName}` : "");

  return (
    <div ref={ref} onClick={props.onClick} className={newClassName} onKeyDown={props.onKeyDown}>
      {props.children}
    </div>
  );
});

const LightBoxVideo = styled(StyledAnimatedLightbox)`
  ${(props) => `
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${props.lightbox_color || "rgba(0, 0, 0, 0.5)"};
    z-index: 1;
    display: flex;
    ${props.lightbox_content_position === "top" ? "padding-top: 60px;" : ""}
    align-items: ${
      props.lightbox_content_position === "top" ? "flex-start" : "center"
    };
    justify-content: center;

    & > svg {
      fill: ${props.lightbox_ui_color || "white"};
    }

    ${
      props.lightbox_ui_color_hover
        ? `
      & > svg:hover {
        fill ${props.lightbox_ui_color_hover};
      }
    `
        : ""
    }
  `}
`;

const ReactPlayerStyled = styled(ReactPlayer)`
  ${stylePlayer}
`;

const ReactPlayerLazyStyled = styled(ReactPlayerLazy)`
  ${stylePlayer}
`;

const VideoContainer = styled.div`
  ${(props) => `
    padding-bottom: ${
      aspectRatio[props.lightbox === "yes" ? "169" : props.aspect_ratio]
    };
    position: relative;
  `}
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
`;

const VideoContainerLightbox = styled.div`
  width: ${(props) =>
    props.lightbox_video_width ? props.lightbox_video_width.size : "75"}%;
  ${(props) =>
    `padding-bottom: calc(${aspectRatio[props.aspect_ratio]}*${
      props.lightbox_video_width
        ? props.lightbox_video_width.size / 100
        : "0.75"
    });`}
  position: relative;
`;

const CloseLightBox = styled(CloseIcon)`
  fill: white;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const VideoOverlay = styled.div`
  display: block;
  width: 100%;
  cursor: pointer;
  height: 100%;
  position: absolute;
  overflow: hidden;

  & svg {
    position: absolute;
    ${(props) =>
      props.play_icon_text_shadow_text_shadow_type === "yes"
        ? `
      filter: drop-shadow(${props.play_icon_text_shadow_text_shadow.horizontal}px ${props.play_icon_text_shadow_text_shadow.vertical}px ${props.play_icon_text_shadow_text_shadow.blur}px ${props.play_icon_text_shadow_text_shadow.color});
    `
        : ""}
    ${(props) => `
      width: ${props.play_icon_size.size}${props.play_icon_size.unit};
      height: ${props.play_icon_size.size}${props.play_icon_size.unit};
      top: calc(50% - ${props.play_icon_size.size / 2}${
      props.play_icon_size.unit
    });
      left: calc(50% - ${props.play_icon_size.size / 2}${
      props.play_icon_size.unit
    });
    `}
    opacity: 0.8;
    ${(props) => `
      color: ${props.play_icon_color};
    `}
    transition: opacity 0.5s;

    ${(props) =>
      props.play_icon_size_tablet
        ? `
      @media ${device.tablet} {
        width: ${props.play_icon_size_tablet.size}${
            props.play_icon_size_tablet.unit
          };
        height: ${props.play_icon_size_tablet.size}${
            props.play_icon_size_tablet.unit
          };
        top: calc(50% - ${props.play_icon_size_tablet.size / 2}${
            props.play_icon_size_tablet.unit
          });
        left: calc(50% - ${props.play_icon_size_tablet.size / 2}${
            props.play_icon_size_tablet.unit
          });
      }
    `
        : ""}

    ${(props) =>
      props.play_icon_size_mobile
        ? `
      @media ${device.mobile} {
        width: ${props.play_icon_size_mobile.size}${
            props.play_icon_size_mobile.unit
          };
        height: ${props.play_icon_size_mobile.size}${
            props.play_icon_size_mobile.unit
          };
        top: calc(50% - ${props.play_icon_size_mobile.size / 2}${
            props.play_icon_size_mobile.unit
          });
        left: calc(50% - ${props.play_icon_size_mobile.size / 2}${
            props.play_icon_size_mobile.unit
          });
      }
    `
        : ""}
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Video = (props) => {
  const [showOverlay, setShowOverlay] = React.useState(true);
  const lightboxref = React.useRef(null);
  const {
    aspect_ratio = "169",
    youtube_url,
    vimeo_url,
    dailymotion_url,
    autoplay,
    controls = "yes",
    start = 0,
    end,
    loop,
    modestbranding,
    mute,
    rel,
    lazy_load,
    video_type = "youtube",
    image_overlay,
    show_image_overlay,
    play_icon,
    play_icon_color = "white",
    play_icon_size = { size: 120, unit: "px" },
    play_icon_size_tablet,
    play_icon_size_mobile,
    hosted_url,
    vimeo_byline = "yes",
    vimeo_portrait = "yes",
    vimeo_title = "yes",
    color = "#FFFFFF",
    logo = "yes",
    showinfo = "yes",
    lightbox,
    lightbox_color,
    lightbox_ui_color,
    lightbox_ui_color_hover,
    lightbox_video_width,
    lightbox_content_position,
    lightbox_content_animation,
    css_filters_blur,
    css_filters_brightness,
    css_filters_contrast,
    css_filters_css_filter,
    css_filters_hue,
    css_filters_saturate,
    play_icon_text_shadow_text_shadow,
    play_icon_text_shadow_text_shadow_type,
  } = props;
  console.log(props);

  const videoUrl = {
    youtube: youtube_url,
    vimeo: vimeo_url,
    dailymotion: dailymotion_url,
    hosted: hosted_url?.url,
  };

  const handleCloseLightBox = () => {
    const classNames = lightboxref.current.className.split(" ");
    const classesWithoutLast = classNames.slice(0, classNames.length - 1);
    lightboxref.current.className = classesWithoutLast.join(" ") + " fadeOut";
    setTimeout(() => setShowOverlay(true), 750);
  };

  const playerConfig = {
    youtube: {
      youtube: {
        playerVars: {
          rel: rel === "yes" ? 0 : 1,
          start,
          end: end ? end : 0,
          autoplay: Number(autoplay === "yes" || show_image_overlay === "yes"),
          modestbranding: Number(modestbranding === "yes"),
        },
      },
    },
    vimeo: {
      vimeo: {
        playerOptions: {
          color: color,
          byline: vimeo_byline === "yes",
          portrait: vimeo_portrait === "yes",
          title: vimeo_title === "yes",
          autoplay: Number(autoplay === "yes" || show_image_overlay === "yes"),
        },
      },
    },
    dailymotion: {
      dailymotion: {
        params: {
          start,
          "ui-logo": logo === "yes",
          "ui-highlight	": color,
          "ui-start-screen-info": showinfo === "yes",
          autoplay: Number(autoplay === "yes" || show_image_overlay === "yes"),
        },
      },
    },
    hosted: {
      file: {
        attributes: {
          controlsList: "nodownload",
          autoPlay: autoplay === "yes" || show_image_overlay === "yes",
        },
      },
    },
  };

  const video = React.createElement(
    lazy_load === "yes" && video_type !== "hosted"
      ? ReactPlayerLazyStyled
      : ReactPlayerStyled,
    {
      config: playerConfig[video_type],
      width: "100%",
      height: "100%",
      controls: controls === "yes",
      loop: loop === "yes",
      muted: mute === "yes",
      url: videoUrl[video_type],
    }
  );

  return (
    <>
      <VideoContainer
        {...{
          aspect_ratio,
          lightbox,
          css_filters_blur,
          css_filters_brightness,
          css_filters_contrast,
          css_filters_css_filter,
          css_filters_hue,
          css_filters_saturate,
        }}
      >
        {(!showOverlay || !show_image_overlay) && lightbox !== "yes" && video}
        {((show_image_overlay === "yes" && showOverlay) ||
          lightbox === "yes") && (
          <VideoOverlay
            onClick={() => setShowOverlay(false)}
            {...{
              play_icon_color,
              play_icon_size,
              play_icon_size_tablet,
              play_icon_size_mobile,
              play_icon_text_shadow_text_shadow,
              play_icon_text_shadow_text_shadow_type,
            }}
          >
            <GatsbyImage
              style={{ width: "100%", height: "100%" }}
              image={image_overlay.data}
              alt="Film"
            />
            <FontAwesomeIcon
              icon={getIcon(
                play_icon?.library || "fa-regular",
                play_icon?.value?.split(" ")[1] || "fa-play-circle"
              )}
            />
          </VideoOverlay>
        )}
      </VideoContainer>
      {(!showOverlay || !show_image_overlay) && lightbox === "yes" && (
        <LightBoxVideo
          ref={lightboxref}
          onKeyDown={(e) => {
            if(e.key === "Escape") handleCloseLightBox();
          }}
          onClick={handleCloseLightBox}
          {...{
            lightbox_color,
            lightbox_ui_color,
            lightbox_ui_color_hover,
            lightbox_content_position,
            lightbox_content_animation,
          }}
        >
          <VideoContainerLightbox {...{ aspect_ratio, lightbox_video_width }}>
            {video}
          </VideoContainerLightbox>
          <CloseLightBox onClick={handleCloseLightBox} />
        </LightBoxVideo>
      )}
    </>
  );
};

export default Video;
