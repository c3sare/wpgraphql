import styled from "styled-components";
import {device} from "../mediaquery/size";

const Spacer = styled.div`
    ${props => props?.space?.size > 0 ? `height: ${props.space.size}${props.space.unit};` : ""}

    ${props => props?.space_tablet?.size > 0 ?
        `@media ${device.tablet} {
            height: ${props.space_tablet.size}${props.space_tablet.unit};
        }` : ""
    }

    ${props => props?.space_mobile?.size > 0 ?
        `@media ${device.mobile} {
            height: ${props.space_mobile.size}${props.space_mobile.unit};
        }` : ""
    }
`;

export default Spacer;