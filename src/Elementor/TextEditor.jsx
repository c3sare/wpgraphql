import React from "react";
import styled from "styled-components";
import { device } from "../mediaquery/size";

const TextEditorStyled = styled.div`${
  props => {
    const {
      text_columns,
      column_gap,
      column_gap_mobile,
      column_gap_tablet,
      drop_cap, align,
      align_mobile,
      align_tablet,
      text_color,
      text_shadow_text_shadow_type,
      text_shadow_text_shadow,
      typography_typography,
      typography_word_spacing,
      typography_text_transform,
      typography_text_decoration,
      typography_line_height,
      typography_letter_spacing,
      typography_font_weight,
      typography_font_style,
      typography_font_size,
      typography_font_size_tablet,
      typography_font_size_mobile,
      typography_font_family,
    } = props;

    return (
      `
        color: ${text_color || "#7A7A7A"};
        ${text_shadow_text_shadow_type === "yes" ? `
          text-shadow: ${text_shadow_text_shadow.horizontal || 0}px ${text_shadow_text_shadow.vertical || 0}px ${text_shadow_text_shadow.blur || 0}px ${text_shadow_text_shadow.color || "black"};
        ` : ""}
        ${align ? `text-align: ${align};`: ""}
        ${text_columns ? `columns: ${text_columns};` : ""}
        ${column_gap ? `column-gap: ${column_gap?.size || 0}${column_gap?.unit || "px"};` : ""}

        @media ${device.tablet} {
          ${column_gap_tablet ? `column-gap: ${column_gap_tablet?.size || 0}${column_gap_mobile?.unit || "px"};` : ""}
          ${align_tablet ? `text-align: ${align_tablet};` : ""}
        }

        @media ${device.mobile} {
          ${column_gap_mobile ? `column-gap: ${column_gap_mobile?.size || 0}${column_gap_mobile?.unit || "px"};` : ""}
          ${align_mobile ? `text-align: ${align_mobile};` : ""}
        }

        ${drop_cap === "yes" ?
        `&>p:first-child:first-letter {
          float: left;
          text-align: center;
          line-height: 1;
          font-size: 50px;
        }` : ""}
      `
    );
  }
}
`;

const TextEditor = (props) => {
  console.log(props);
  const {
    editor,
    text_columns,
    column_gap,
    column_gap_tablet,
    column_gap_mobile,
    drop_cap,
    align,
    align_tablet,
    align_mobile,
    text_color,
    text_shadow_text_shadow_type,
    text_shadow_text_shadow
  } = props;

  return (
    <TextEditorStyled
      {...{text_columns, column_gap, column_gap_tablet, column_gap_mobile, drop_cap, align, align_tablet, align_mobile, text_color, text_shadow_text_shadow_type, text_shadow_text_shadow}}
      dangerouslySetInnerHTML={{ __html: editor || "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>" }}
    />
  );
};

export default TextEditor;
