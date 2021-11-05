import {
  Box,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import marksy from "marksy";
import React, { createElement } from "react";
import { atomOneDark, CodeBlock } from "react-code-blocks";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const SupportedLanguages = [
  "abap",
  "actionscript",
  "ada",
  "arduino",
  "autoit",
  "c",
  "clojure",
  "cs",
  "c",
  "cpp",
  "coffeescript",
  "csharp",
  "css",
  "cuda",
  "d",
  "dart",
  "delphi",
  "elixir",
  "elm",
  "erlang",
  "fortran",
  "foxpro",
  "fsharp",
  "go",
  "graphql",
  "gql",
  "groovy",
  "haskell",
  "haxe",
  "html",
  "java",
  "javascript",
  "json",
  "julia",
  "jsx",
  "js",
  "kotlin",
  "latex",
  "lisp",
  "livescript",
  "lua",
  "mathematica",
  "makefile",
  "matlab",
  "objectivec",
  "objective",
  "objective",
  "objectpascal",
  "ocaml",
  "octave",
  "perl",
  "php",
  "powershell",
  "prolog",
  "puppet",
  "python",
  "qml",
  "r",
  "racket",
  "restructuredtext",
  "rest",
  "ruby",
  "rust",
  "sass",
  "less",
  "scala",
  "scheme",
  "shell",
  "smalltalk",
  "sql",
  "standardml",
  "sml",
  "swift",
  "tcl",
  "tex",
  "text",
  "tsx",
  "ts",
  "typescript",
  "vala",
  "vbnet",
  "verilog",
  "vhdl",
  "xml",
  "xquery",
  "yaml",
];

const compile = marksy({
  // Pass in whatever creates elements for your
  // virtual DOM library. h('h1', {})
  createElement,
  components: {
    color: (props: { children: any; isRight?: boolean }) => {
      return (
        <Tooltip title="Нажми, чтобы скопировать" placement="top">
          <Box
            sx={{
              width: "max-content",
              cursor: "pointer",
              margin: (theme) => `${theme.spacing(1)} 0`,
            }}
            onClick={() => navigator.clipboard.writeText(props.children)}
          >
            <Typography
              variant="inherit"
              sx={{
                textTransform: "uppercase",
                display: "flex",
                alignItems: "baseline",
                position: "relative",
                width: "max-content",
                cursor: "pointer",
                margin: (theme) => `${theme.spacing(1)} 0`,
              }}
            >
              {!props.isRight && (
                <Box
                  component="span"
                  sx={{
                    height: "1em",
                    width: "1em",
                    backgroundColor: props.children,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: "4px",
                    marginRight: (theme) => theme.spacing(1),
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                />
              )}
              {props.children}
              {props.isRight && (
                <Box
                  component="span"
                  sx={{
                    height: "1em",
                    width: "1em",
                    backgroundColor: props.children,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: "4px",
                    marginLeft: (theme) => theme.spacing(1),
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                />
              )}
            </Typography>
          </Box>
        </Tooltip>
      );
    },
  },

  // You can override the default elements with
  // custom VDOM trees
  elements: {
    h1: (props: any) => {
      return (
        <Typography
          variant={"h3"}
          sx={{
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
          }}
          children={props.children}
        />
      );
    },
    h2: (props: any) => {
      return (
        <Typography
          variant={"h4"}
          sx={{
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
          }}
          children={props.children}
        />
      );
    },
    h3: (props: any) => {
      return (
        <Typography
          variant={"h5"}
          sx={{
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
          }}
          children={props.children}
        />
      );
    },
    h4: (props: any) => {
      return (
        <Typography
          variant={"h6"}
          sx={{
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
          }}
          children={props.children}
        />
      );
    },
    h5: (props: any) => {
      return (
        <Typography
          variant={"subtitle1"}
          sx={{
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
          }}
          children={props.children}
        />
      );
    },
    h6: (props: any) => {
      return (
        <Typography
          variant={"subtitle2"}
          sx={{
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
          }}
          children={props.children}
        />
      );
    },
    hr: () => <Divider />,
    p: (props: any) => <Typography variant="body2" children={props.children} />,
    img: (props: any) => (
      <LazyLoadImage
        src={props.src.replaceAll("&amp;", "&")}
        alt={props.alt}
        style={{ maxWidth: "100%" }}
      />
    ),
    a: (props: any) => (
      <Link
        href={props.href}
        title={props.title}
        target={props.target}
        children={props.children}
        underline="hover"
        variant="inherit"
      />
    ),
    blockquote: (props: any) => (
      <Typography
        children={props.children}
        variant="inherit"
        sx={{
          paddingLeft: "1rem",
          borderLeft: (theme) => "3px solid " + theme.palette.primary.main,
          marginTop: (theme) => theme.spacing(1),
          marginBottom: (theme) => theme.spacing(1),
          whiteSpace: "pre-wrap",
        }}
      />
    ),
    br: () => <br />,
    code: (props: any) => (
      <div
        style={{
          margin: "0.25rem 0",
          padding: "0.5rem 0",
        }}
      >
        <CodeBlock
          text={props.code}
          language={
            SupportedLanguages.includes(props.language)
              ? props.language
              : "text"
          }
          showLineNumbers={false}
          theme={atomOneDark}
        />
      </div>
    ),
    codespan: (props: any) => (
      <div
        style={{
          margin: "0.25rem 0",
          display: "inline-block",
        }}
      >
        <CodeBlock
          text={props.children}
          language={"text"}
          showLineNumbers={false}
          theme={atomOneDark}
        />
      </div>
    ),
    table: (props: { children: any }) => (
      <Paper
        elevation={6}
        sx={{
          width: "max-content",
          marginTop: (theme) => theme.spacing(1),
          marginBottom: (theme) => theme.spacing(1),
          overflowY: "hidden",
        }}
      >
        <Table
          size="small"
          sx={{
            maxWidth: "100%",
            width: "max-content",
          }}
          children={props.children}
        />
      </Paper>
    ),
    thead: (props: { children: any }) => (
      <TableHead children={props.children} />
    ),
    tbody: (props: { children: any }) => (
      <TableBody children={props.children} />
    ),
    tr: (props: { children: any }) => <TableRow children={props.children} />,
    th: (props: { className: string; children: any }) => (
      <TableCell
        children={props.children}
        align={
          !!props.className ? (props.className.split("-")[1] as any) : "inherit"
        }
      />
    ),
    td: (props: { className: string; children: any }) => (
      <TableCell
        children={props.children}
        align={
          !!props.className ? (props.className.split("-")[1] as any) : "inherit"
        }
      />
    ),
  },
});

const Marksy: React.FC<{ text: string }> = ({ text }) => {
  const compiled = compile(text, {});

  return (
    <Box
      className="marksy hide-scrollbar"
      sx={{ maxWidth: "100%", overflowX: "scroll" }}
    >
      {compiled.tree}
    </Box>
  );
};

export default Marksy;
