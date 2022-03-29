import {
  Alert,
  Box,
  chakra,
  Kbd,
  useColorModeValue,
  useColorMode,
  Heading,
  Divider,
} from "@chakra-ui/react";
import NextImage from "next/image";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

const ChakraHighlight = chakra(Highlight, {
  shouldForwardProp: (prop) =>
    ["Prism", "theme", "code", "language", "children"].includes(prop),
});

const Pre = (props: any) => <chakra.div my={4} {...props} />;

const CodeHighlight = (props: any) => {
  const { children: codeString, className: language } = props;

  const planguage = language?.replace("language-", "") ?? "";
  const theme = useColorModeValue(lightTheme, darkTheme);
  const lineNumberColor = useColorModeValue("blackAlpha.500", "whiteAlpha.500");
  const preBackground = useColorModeValue("gray.50", "gray.900");
  const showLineNumbers = !["shell", "text"].includes(planguage);

  const inlineCode = {
    bg: useColorModeValue("gray.100", "gray.700"),
    color: useColorModeValue("gray.700", "gray.100"),
  };

  // inline code
  if (!planguage)
    return (
      <chakra.span
        borderRadius="4"
        px={1}
        py={1}
        bg={inlineCode.bg}
        color={inlineCode.color}
        {...props}
      />
    );

  return (
    <ChakraHighlight
      {...defaultProps}
      code={codeString}
      language={planguage}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        tokens.pop();
        return (
          <div data-language={className}>
            <chakra.pre
              className={className}
              sx={{ ...style, backgroundColor: preBackground }}
              overflowX="auto"
              rounded="md"
              p={4}
              mx={-4}
              _before={{
                content: `"${planguage}"`,
                display: "inline-block",
                mr: 4,
                fontSize: 12,
              }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });

                return (
                  // eslint-disable-next-line react/jsx-key
                  <chakra.div {...lineProps} display="table-row">
                    {showLineNumbers && (
                      <chakra.span
                        w={8}
                        textAlign="right"
                        userSelect="none"
                        color={lineNumberColor}
                        pr={3}
                      >
                        {i + 1}
                      </chakra.span>
                    )}
                    {line.map((token, key) => {
                      // eslint-disable-next-line react/jsx-key
                      return <chakra.span {...getTokenProps({ token, key })} />;
                    })}
                  </chakra.div>
                );
              })}
            </chakra.pre>
          </div>
        );
      }}
    </ChakraHighlight>
  );
};

const Image = (props: any) => {
  return <NextImage {...props} layout="fill" loading="lazy" quality={100} />;
};

const Anchor = (props: any) => {
  return (
    <chakra.a
      fontWeight={"bold"}
      color={useColorModeValue("purple.800", "purple.400")}
      {...props}
    />
  );
};

const MDXComponents = {
  h1: (props: any) => <Heading as="h1" size="3xl" my={4} {...props} />,
  h2: (props: any) => <Heading as="h2" size="2xl" my={2} {...props} />,
  h3: (props: any) => <Heading as="h3" size="xl" my={2} {...props} />,
  h4: (props: any) => <Heading as="h4" size="lg" my={2} {...props} />,
  // p: (props: any) => <chakra.p lineHeight={1.7} {...props} />,
  ul: (props: any) => <chakra.ul mx={4} {...props} />,
  ol: (props: any) => <chakra.ol mx={4} {...props} />,
  code: CodeHighlight,
  pre: Pre,
  img: Image,
  a: Anchor,
  kbd: Kbd,
  hr: (props: any) => <Divider my={4} {...props} />,
  blockquote: (props: any) => (
    <Alert
      as="blockquote"
      role="none"
      rounded="4px"
      status="error"
      variant="left-accent"
      {...props}
      w="unset"
      mx={-4}
    />
  ),
  Box: Box,
};

export default MDXComponents;
