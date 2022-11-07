import React from "react";
import styled from "styled-components";
import { device } from "../mediaquery/size";

const MapContainer = styled.div`
    width: 100%;
    ${props => props.hover_transition ? `
        transition: filter ${props.hover_transition?.size}s;
    ` : ""}

    ${props => {
        const {css_filters_blur, css_filters_brightness, css_filters_contrast, css_filters_css_filter, css_filters_hue, css_filters_saturate} = props;
        if(css_filters_css_filter !== "custom") return "";
        const tab = [];
        if(css_filters_blur) tab.push(`blur(${css_filters_blur?.size}px)`);
        if(css_filters_brightness) tab.push(`brightness(${css_filters_brightness?.size}%)`)
        if(css_filters_contrast) tab.push(`contrast(${css_filters_contrast?.size}%)`)
        if(css_filters_saturate) tab.push(`saturate(${css_filters_saturate?.size}%)`);
        if(css_filters_hue) tab.push(`hue-rotate(${css_filters_hue?.size}deg)`);

        if(tab.length > 0) return `filter: ${tab.join(" ")};`;
        else return "";
    }}

    ${props => {
        const {css_filters_hover_blur, css_filters_hover_brightness, css_filters_hover_contrast, css_filters_hover_css_filter, css_filters_hover_hue, css_filters_hover_saturate} = props;
        if(css_filters_hover_css_filter !== "custom") return "";
        const tab = [];
        if(css_filters_hover_blur) tab.push(`blur(${css_filters_hover_blur?.size}px)`);
        if(css_filters_hover_brightness) tab.push(`brightness(${css_filters_hover_brightness?.size}%)`)
        if(css_filters_hover_contrast) tab.push(`contrast(${css_filters_hover_contrast?.size}%)`)
        if(css_filters_hover_saturate) tab.push(`saturate(${css_filters_hover_saturate?.size}%)`);
        if(css_filters_hover_hue) tab.push(`hue-rotate(${css_filters_hover_hue?.size}deg)`);

        if(tab.length > 0) return `
            &:hover {
                filter: ${tab.join(" ")};
            }
        `;
        else return "";
    }}
`;

const IframeStyled = styled.iframe`
    width: 100%;
    border: 0;
    
    ${props => `
        @media ${device.laptop} {
            height: ${props.heightStyle.size}${props.heightStyle.unit};
        }
    `}

    ${props => props.height_tablet?.size ? `
        @media ${device.tablet} {
            height: ${props.height_tablet?.size}${props.height_tablet?.unit};
        }
    ` : ""}

    ${props => props.height_mobile?.size ? `
        @media ${device.mobile} {
            height: ${props.height_mobile?.size}${props.height_mobile?.unit};
        }
    ` : ""}
`;

const GoogleMaps = (props) => {
    console.log(props);
    const {
        zoom={size: 0},
        address="",
        height={size: 300, unit: "px"},
        height_tablet,
        height_mobile,
        css_filters_blur,
        css_filters_brightness,
        css_filters_contrast,
        css_filters_css_filter,
        css_filters_hover_blur,
        css_filters_hover_hue,
        css_filters_hover_saturate,
        css_filters_hover_brightness,
        css_filters_hover_contrast,
        css_filters_hover_css_filter,
        css_filters_hue,
        css_filters_saturate,
        hover_transition
    } = props;
    return (
        <MapContainer
            {...{
                hover_transition,
                css_filters_blur,
                css_filters_brightness,
                css_filters_contrast,
                css_filters_css_filter,
                css_filters_hue,
                css_filters_saturate,
                css_filters_hover_blur,
                css_filters_hover_hue,
                css_filters_hover_saturate,
                css_filters_hover_brightness,
                css_filters_hover_contrast,
                css_filters_hover_css_filter
            }}
        >
            <IframeStyled
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=m&z=${zoom.size}&output=embed&iwloc=near`}
              heightStyle={height}
              height_tablet={height_tablet}
              height_mobile={height_mobile}
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title={address}
              aria-label={address}
            />
        </MapContainer>
    )
}

export default GoogleMaps;