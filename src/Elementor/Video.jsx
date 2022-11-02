import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled, { keyframes } from "styled-components";
import PlayIcon from "../images/play.svg";
import CloseIcon from "../images/close.svg";
import ReactPlayer from "react-player";
import ReactPlayerLazy from "react-player/lazy";
import { getIcon } from "../fontawesome/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const LightBoxVideo = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${fadeIn} 0.4s forwards ease-in;
`;

const ReactPlayerStyled = styled(ReactPlayer)`
  ${stylePlayer}
`;

const ReactPlayerLazyStyled = styled(ReactPlayerLazy)`
  ${stylePlayer}
`;

const VideoContainer = styled.div`
  padding-bottom: 56.25%;
  position: relative;
`;

const VideoContainerLightbox = styled.div`
  width: 75%;
  padding-bottom: 46.25%;
  position: relative;

  @media (max-width: 768px) {
    padding-bottom: 66.25%;
    width: 100%;
  }
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
    width: 120px;
    height: 120px;
    top: calc(50% - 60px);
    left: calc(50% - 60px);
    opacity: .8;
    fill: white;
    color: white;
    filter: blur(0.5px);
    transition: opacity 0.5s;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Video = (props) => {
  const [showOverlay, setShowOverlay] = React.useState(true);
  const {
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
    hosted_url,
    vimeo_byline = "yes",
    vimeo_portrait = "yes",
    vimeo_title = "yes",
    color = "#FFFFFF",
    logo = "yes",
    showinfo = "yes",
    lightbox,
  } = props;

  const videoUrl = {
    youtube: youtube_url,
    vimeo: vimeo_url,
    dailymotion: dailymotion_url,
    hosted: hosted_url?.url,
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
    <VideoContainer>
      {(!showOverlay || !show_image_overlay) &&
        (lightbox === "yes" ? (
          <>
            <LightBoxVideo onClick={() => setShowOverlay(true)}>
              <VideoContainerLightbox>{video}</VideoContainerLightbox>
              <CloseLightBox onClick={() => setShowOverlay(true)} />
            </LightBoxVideo>
          </>
        ) : (
          video
        ))}
      {((show_image_overlay === "yes" && showOverlay) ||
        lightbox === "yes") && (
        <VideoOverlay onClick={() => setShowOverlay(false)}>
          <GatsbyImage style={{width: "100%"}} image={image_overlay.data} alt="Film" />
          {play_icon ?
            <FontAwesomeIcon icon={getIcon(play_icon.library, play_icon.value.split(" ")[1])}/>
            :
            <PlayIcon/>
          }
        </VideoOverlay>
      )}
    </VideoContainer>
  );
};

export default Video;
