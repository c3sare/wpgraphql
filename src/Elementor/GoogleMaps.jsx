import React from "react";
import styled from "styled-components";
import { device } from "../mediaquery/size";

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
    const {zoom={size: 0}, address="", height={size: 300, unit: "px"}, height_tablet, height_mobile} = props;
    return (
        <div style={{width: "100%"}}>
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
        </div>
    )
}

export default GoogleMaps;