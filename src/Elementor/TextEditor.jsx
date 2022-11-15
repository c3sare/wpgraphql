import React from "react";
import styled from "styled-components";
import { device } from "../mediaquery/size";
import { Link } from "gatsby";
import { getSrcSet } from "gatsby-plugin-image";

const TextEditorStyled = styled.div`
  ${(props) => {
    const {
      text_columns,
      column_gap,
      column_gap_mobile,
      column_gap_tablet,
      drop_cap,
      align,
      align_mobile,
      align_tablet,
      text_color,
      text_shadow_text_shadow_type,
      text_shadow_text_shadow,
      typography_typography,
      typography_word_spacing,
      typography_word_spacing_tablet,
      typography_word_spacing_mobile,
      typography_text_transform,
      typography_text_decoration,
      typography_line_height,
      typography_line_height_tablet,
      typography_line_height_mobile,
      typography_letter_spacing,
      typography_letter_spacing_tablet,
      typography_letter_spacing_mobile,
      typography_font_weight,
      typography_font_style,
      typography_font_size,
      typography_font_size_tablet,
      typography_font_size_mobile,
      typography_font_family,
    } = props;

    return `
        color: ${text_color || "#7A7A7A"};
        ${
          text_shadow_text_shadow_type === "yes"
            ? `
          text-shadow: ${text_shadow_text_shadow.horizontal || 0}px ${
                text_shadow_text_shadow.vertical || 0
              }px ${text_shadow_text_shadow.blur || 0}px ${
                text_shadow_text_shadow.color || "black"
              };
        `
            : ""
        }
        ${align ? `text-align: ${align};` : ""}
        ${text_columns ? `columns: ${text_columns};` : ""}
        ${
          column_gap
            ? `column-gap: ${column_gap?.size || 0}${column_gap?.unit || "px"};`
            : ""
        }

        ${
          typography_typography === "custom"
            ? `
            ${
              typography_font_family
                ? `
                font-family: "${typography_font_family}", Sans-serif;
              `
                : ""
            }
            ${
              typography_word_spacing
                ? `
                  word-spacing: ${
                    typography_word_spacing.size + typography_word_spacing.unit
                  };
                `
                : ""
            }
            ${
              typography_text_transform
                ? `
                text-transform: ${typography_text_transform};
              `
                : ""
            }
            ${
              typography_text_decoration
                ? `
                text-decoration: ${typography_text_decoration};
              `
                : ""
            }
            ${
              typography_line_height
                ? `
                line-height: ${
                  typography_line_height.size + typography_line_height.unit
                };
              `
                : ""
            }
            ${
              typography_letter_spacing
                ? `
                letter-spacing: ${
                  typography_letter_spacing.size +
                  typography_letter_spacing.unit
                };
              `
                : ""
            }
            ${
              typography_font_weight
                ? `
                font-weight: ${typography_font_weight};
              `
                : ""
            }
            ${
              typography_font_style
                ? `
                font-style: ${typography_font_style};
              `
                : ""
            }
            ${
              typography_font_size
                ? `
                font-size: ${
                  typography_font_size.size + typography_font_size.unit
                };
              `
                : ""
            }
          `
            : ""
        }

        @media ${device.tablet} {
          ${
            column_gap_tablet
              ? `column-gap: ${column_gap_tablet?.size || 0}${
                  column_gap_mobile?.unit || "px"
                };`
              : ""
          }
          ${align_tablet ? `text-align: ${align_tablet};` : ""}
          ${
            typography_typography === "custom"
              ? `
              ${
                typography_word_spacing_tablet
                  ? `
                  word-spacing: ${
                    typography_word_spacing_tablet.size +
                    typography_word_spacing_tablet.unit
                  };
                `
                  : ""
              }
              ${
                typography_line_height_tablet
                  ? `
                  line-height: ${
                    typography_line_height_tablet.size +
                    typography_line_height_tablet.unit
                  };
                `
                  : ""
              }
              ${
                typography_letter_spacing_tablet
                  ? `
                  letter-spacing: ${
                    typography_letter_spacing_tablet.size +
                    typography_letter_spacing_tablet.unit
                  };
                `
                  : ""
              }
              ${
                typography_font_size_tablet
                  ? `
                  font-size: ${
                    typography_font_size_tablet.size +
                    typography_font_size_tablet.unit
                  };
                `
                  : ""
              }
            `
              : ""
          }
        }

        @media ${device.mobile} {
          ${
            column_gap_mobile
              ? `column-gap: ${column_gap_mobile?.size || 0}${
                  column_gap_mobile?.unit || "px"
                };`
              : ""
          }
          ${align_mobile ? `text-align: ${align_mobile};` : ""}
          ${
            typography_typography === "custom"
              ? `
              ${
                typography_word_spacing_mobile
                  ? `
                  word-spacing: ${
                    typography_word_spacing_mobile.size +
                    typography_word_spacing_mobile.unit
                  };
                `
                  : ""
              }
              ${
                typography_line_height_mobile
                  ? `
                  line-height: ${
                    typography_line_height_mobile.size +
                    typography_line_height_mobile.unit
                  };
                `
                  : ""
              }
              ${
                typography_letter_spacing_mobile
                  ? `
                  letter-spacing: ${
                    typography_letter_spacing_mobile.size +
                    typography_letter_spacing_mobile.unit
                  };
                `
                  : ""
              }
              ${
                typography_font_size_mobile
                  ? `
                  font-size: ${
                    typography_font_size_mobile.size +
                    typography_font_size_mobile.unit
                  };
                `
                  : ""
              }
            `
              : ""
          }
        }

        ${
          drop_cap === "yes"
            ? `&>p:first-child:first-letter {
          float: left;
          text-align: center;
          line-height: 1;
          font-size: 50px;
        }`
            : ""
        }
      `;
  }}
`;

const LinkExternal = styled.a`
  color: inherit;
  text-decoration: none;
`;

const LinkInternal = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const TextEditor = (props) => {
  const { editor, location, headlessUrl } = props;
  const [contentEditor, setContentEditor] = React.useState(null);

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

    const linkelement = (node) => {
      const props = node.attributes;
      const children = createNodes(node.elements);
      if (
        props.href.indexOf(headlessUrl) === 0 ||
        props.href.indexOf(location.href) === 0
      ) {
        const url = props.href;
        if (props.href.indexOf(headlessUrl) === 0) {
          props.href = url.slice(
            url.indexOf(headlessUrl) + headlessUrl.length - 1
          );
        } else {
          props.href = url.slice(
            url.indexOf(location.href) + location.href.length - 1
          );
        }
      }
      if (isExternal(props.href))
        return <LinkExternal {...{ ...props, children }} />;
      else {
        return <LinkInternal {...{ to: props.href, children }} />;
      }
    };

    function createNodes(nodes) {
      return nodes.map((node, index) => {
        if (node.attributes?.class) {
          node.attributes.className = node.attributes.class;
          delete node.attributes.class;
        }
        if (
          node?.attributes?.style &&
          typeof node?.attributes?.style === "string"
        ) {
          const styleObject = {};
          const allStyleObjects = node.attributes.style.split(";");
          for (let i = 0; i < allStyleObjects.length; i++) {
            const splitted = allStyleObjects?.[i]?.split(":");
            if (splitted[0] !== "") {
              const x = splitted?.[0]?.split("-");
              const newItem = x.map((item, index) => {
                if (index !== 0) item = item[0].toUpperCase() + item.slice(1);
                return item;
              });
              styleObject[newItem.join("")] = splitted?.[1]?.replace(" ", "");
            }
          }
          node.attributes.style = { ...styleObject };
        }
        return node.type === "element" ? (
          ["a", "img"].includes(node.name) ? (
            node.name === "a" ? (
              linkelement(node)
            ) : (
              <img
                srcSet={getSrcSet(node.attributes.src)}
                alt={node.attributes.alt}
                width={node.attributes.width}
                height={node.attributes.height}
              />
            )
          ) : (
            React.createElement.apply(
              this,
              [
                node.name,
                node.attributes
                  ? { ...node.attributes, key: index }
                  : { key: index },
              ].concat(
                node.elements?.length > 0 ? createNodes(node?.elements) : []
              )
            )
          )
        ) : (
          node.text
        );
      });
    }
    setContentEditor(createNodes(editor.elements[0].elements));
  }, []);

  return <TextEditorStyled {...props}>{contentEditor}</TextEditorStyled>;
};

export default TextEditor;
