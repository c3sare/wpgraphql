import React from 'react';
import styled from 'styled-components';

const IFrameYoutube = styled.iframe`
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
}
`;

const VideoContainer = styled.div`
    padding-bottom: 56.25%;
    position: relative;
`;

const Video = (props) => {
    const {
        youtube_url,
        vimeo_url,
        dailymotion_url,
        autoplay,
        controls="yes",
        start=0,
        end,
        loop,
        modestbranding,
        mute,
        yt_privacy,
        lazy_load,
        image_overlay,
        image_overlay_size,
        location
    } = props;

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }
    
    console.log(props);
    return (
        <VideoContainer>
            <IFrameYoutube
                loading={lazy_load === "yes" ? "lazy" : "eager"}
                frameBorder="0"
                allowFullScreen="1"
                href={youtube_url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Video Placeholder"
                width="640"
                height="360"
                src={`https://www.youtube${yt_privacy === "yes" ? "-nocookie" : ""}.com/embed/${
                    youtube_parser(youtube_url)
                }?controls=${controls === "yes" ? 1 : 0}&rel=0&playsinline=1&modestbranding=${
                    modestbranding === "yes"
                    ? 1 : 0
                }&autoplay=${
                    autoplay === "yes"
                    ? 1 : 0
                }&start=${
                    start
                }${
                    end ? `&end=${end}` : ""
                }&enablejsapi=1&origin=${
                    location.origin
                }&widgetid=1${
                    mute ?
                        "&mute=1"
                    : ""
                }${loop === "yes" ? "&playlist="+youtube_parser(youtube_url)+"&loop=1" : ""}`}
            />
        </VideoContainer>
    )

}

export default Video;